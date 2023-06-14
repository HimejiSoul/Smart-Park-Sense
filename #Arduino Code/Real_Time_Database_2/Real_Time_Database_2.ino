/* Read RFID Tag with RC522 RFID Reader
    SDA    D4
    SCK    D5
    MOSI   D7
    MISO   D6
    GND    GND
    RST    D3
    3v3    3v3

    Note:
    - Dalam satu garis di esp8266nya
    - Boardnya: NodeMcu 1.0 (12E Module)

*/
#include <ESP8266WiFi.h>
#include <FirebaseESP8266.h>
#include <SPI.h>
#include <MFRC522.h>
#include <NTPClient.h>
#include <WiFiUdp.h>
#include <time.h>
#include <Servo.h>

// Firebase credentials
#define FIREBASE_HOST "https://projectiot-b2f13-default-rtdb.asia-southeast1.firebasedatabase.app"
#define FIREBASE_AUTH "uQwyBaJQ49Ghf3JjM6ebJVd5AtNNPX5w5G3Xx8NG"

// Wi-Fi credentials
#define WIFI_SSID "Galaxy Bima Sakti"
#define WIFI_PASSWORD "samaankita"

constexpr uint8_t RST_PIN = D3;     // Configurable, see typical pin layout above
constexpr uint8_t SS_PIN = D4;     // Configurable, see typical pin layout above

MFRC522 rfid(SS_PIN, RST_PIN);
MFRC522::MIFARE_Key key;

String tag;

FirebaseData firebaseData;

Servo servo;

WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org");


void setup() {
  Serial.begin(115200);
  Serial.println("\n");
  servo.attach(D1);
  servo.write(0);
  // Connect to Wi-Fi
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println();
  Serial.println("Wi-Fi connected");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
  SPI.begin(); // Init SPI bus
  rfid.PCD_Init(); // Init MFRC522
  // Initialize Firebase
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);

  if (!Firebase.beginStream(firebaseData, "/")) {
    Serial.println("Failed to connect to Firebase");
    Serial.println(firebaseData.errorReason());
    return;
  }

  Serial.println("Connected to Firebase");

  // Initialize NTPClient
  timeClient.begin();
  timeClient.setTimeOffset(25200);
  timeClient.forceUpdate();
}

void loop() {
  // Check if a new RFID card is present
  if (!rfid.PICC_IsNewCardPresent())
    return;

  // Read the RFID card serial
  if (rfid.PICC_ReadCardSerial()) {
    // Extract the UID from the RFID card
    tag = "";
    for (byte i = 0; i < rfid.uid.size; i++) {
      tag += String(rfid.uid.uidByte[i], HEX);
    }
    Serial.println("UID: " + tag);

    String path = "/history/" + tag + "/timein";
    Firebase.getString(firebaseData, path.c_str());
    if (firebaseData.stringData() == "") {
      Serial.println("UID belum terdaftar pada smart parking");
      return;
    } else {

      // Get the server time
      time_t serverTime = timeClient.getEpochTime();
      struct tm* timeinfo;
      timeinfo = localtime(&serverTime);

      // Format the time
      char timeOutValue[30];
      sprintf(timeOutValue, "%d-%02d-%02d %02d:%02d:%02d:%03d",
              timeinfo->tm_year + 1900, timeinfo->tm_mon + 1, timeinfo->tm_mday,
              timeinfo->tm_hour, timeinfo->tm_min, timeinfo->tm_sec,
              millis() % 1000);

      String timeInPath = timeOutValue;
      timeInPath.replace(" ", "_");

      // Update the "timeout" field in Firebase
      String path = "/history/" + tag + "/timeout";
      if (Firebase.setString(firebaseData, path.c_str(), timeOutValue)) {
        Serial.println("Timeout updated in Firebase");
        Serial.println("Path: " + firebaseData.dataPath());
        Serial.println("Type: " + firebaseData.dataType());
      } else {
        Serial.println("Failed to update timeout in Firebase");
        Serial.println("Reason: " + firebaseData.errorReason());
      }
      servo.write(180);
      delay(5000);
      servo.write(0);
    }
    rfid.PICC_HaltA();
    rfid.PCD_StopCrypto1();
  }
}
