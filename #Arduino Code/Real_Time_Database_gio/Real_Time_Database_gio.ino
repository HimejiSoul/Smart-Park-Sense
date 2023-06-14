#include <ESP8266WiFi.h>
#include <FirebaseESP8266.h>
#include <SPI.h>
#include <MFRC522.h>
#include <NTPClient.h>
#include <WiFiUdp.h>
#include <time.h>
#include <Wire.h> 
#include <LiquidCrystal_I2C.h>
#include <Servo.h>

LiquidCrystal_I2C lcd(0x27, 16, 2);

Servo servo;     // Create a servo object

int servoPin = D0;

// Firebase credentials
#define FIREBASE_HOST "https://projectiot-b2f13-default-rtdb.asia-southeast1.firebasedatabase.app"
#define FIREBASE_AUTH "uQwyBaJQ49Ghf3JjM6ebJVd5AtNNPX5w5G3Xx8NG"

// Wi-Fi credentials
#define WIFI_SSID "Ojan"
#define WIFI_PASSWORD "Ojan1234"

constexpr uint8_t RST_PIN = D3;     // Configurable, see typical pin layout above
constexpr uint8_t SS_PIN = D4;     // Configurable, see typical pin layout above

MFRC522 rfid(SS_PIN, RST_PIN);
MFRC522::MIFARE_Key key;

String tag;
int id=1;

FirebaseData firebaseData;

WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org");

int tapCount = 0; // Global variable to track tap count
boolean ir[3];
int empty = -1;

void setup() {
  Serial.begin(115200);
  lcd.begin();
  lcd.backlight();
  ir[0] = false;
  ir[1] = true; 
  ir[2] = true;

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

  servo.write(0);
}

void loop() {

  if (!rfid.PICC_IsNewCardPresent())
    return;
  if (rfid.PICC_ReadCardSerial()) {
    for (int j = 0; j < 3; j++) {
      if (ir[j] == false) {
        empty = j+1;
        lcd.setCursor(0,0);
        lcd.print("Silahkan Mengisi");
        lcd.setCursor(0,1);
        lcd.print("Slot Nomor: ");
        lcd.setCursor(12,1);
        lcd.print(String(empty));
        servo.write(90);
        delay(5000);
        servo.write(0);
        lcd.clear();
      } 
    }
    if (empty < 0) {
        lcd.print("Parkiran Penuh");
        delay(5000);
        lcd.clear();
    }
    tag = "";
    for (byte i = 0; i < rfid.uid.size; i++) {
//      tag += String(rfid.uid.uidByte[i] < 0x10 ? "0" : "");
      tag += String(rfid.uid.uidByte[i], HEX);
    }
    Serial.println("UID: " + tag);

    // Generate random values for the fields
    int irValue = 1;

    // Get the server time
    time_t serverTime = timeClient.getEpochTime();
    struct tm *timeinfo;
    timeinfo = localtime(&serverTime);

    // Format the time
    char timeInValue[30];
    sprintf(timeInValue, "%d-%02d-%02d %02d:%02d:%02d.%03d",
            timeinfo->tm_year + 1900, timeinfo->tm_mon + 1, timeinfo->tm_mday,
            timeinfo->tm_hour, timeinfo->tm_min, timeinfo->tm_sec,
            millis() % 1000);
    String timeOutValue = "";

    // Create a JSON object
    FirebaseJson json;
    json.add("ir", irValue);
    json.add("timein", timeInValue);
    json.add("timeout", timeOutValue);
    json.add("uid", tag);

    String timeInPath = timeInValue;
    timeInPath.replace(" ", "_");

    // Push the JSON object to the '/history' path in Firebase
    String path = "/history/" + tag;
    if (Firebase.setJSON(firebaseData, path.c_str(), json)) {
      Serial.println("Data pushed to Firebase");
      Serial.println("Path: " + firebaseData.dataPath());
      Serial.println("Type: " + firebaseData.dataType());
    } else {
      Serial.println("Failed to push data to Firebase");
      Serial.println("Reason: " + firebaseData.errorReason());
    }

    id++;

    rfid.PICC_HaltA();
    rfid.PCD_StopCrypto1();
  }
  //delay(5000);
}
