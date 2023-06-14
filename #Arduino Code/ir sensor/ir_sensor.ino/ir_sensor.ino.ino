#include <ESP8266WiFi.h>
#include <FirebaseESP8266.h>

// Firebase credentials
#define FIREBASE_HOST "https://projectiot-b2f13-default-rtdb.asia-southeast1.firebasedatabase.app"
#define FIREBASE_AUTH "uQwyBaJQ49Ghf3JjM6ebJVd5AtNNPX5w5G3Xx8NG"

// Wi-Fi credentials
#define WIFI_SSID "Galaxy Bima Sakti"
#define WIFI_PASSWORD "samaankita"

FirebaseData firebaseData;

Servo servo;

const int irSensorPin1 = D2;   // Digital pin connected to IR sensor OUT pin
const int ledPin1 = D6;       // Digital pin connected to LED
const int irSensorPin2 = D3;
const int ledPin2 = D7;
const int irSensorPin3 = D4;
const int ledPin3 = D8;
String ir1 = "kosong", ir2 = "kosong", ir3 = "kosong";

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
  Serial.println("\n");
  Serial.println("Wi-Fi connected");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);

  if (!Firebase.beginStream(firebaseData, "/")) {
    Serial.println("Failed to connect to Firebase");
    Serial.println(firebaseData.errorReason());
    return;
  }

  Serial.println("Connected to Firebase");
  Serial.println();
  pinMode(irSensorPin1, INPUT);   // Set IR sensor pin as input
  pinMode(irSensorPin2, INPUT);
  pinMode(irSensorPin3, INPUT);

  pinMode(ledPin1, OUTPUT);       // Set LED pin as output
  pinMode(ledPin2, OUTPUT);
  pinMode(ledPin3, OUTPUT);
}

void loop() {
  int sensorValue1 = digitalRead(irSensorPin1);  // Read IR sensor pin
  int sensorValue2 = digitalRead(irSensorPin2);
  int sensorValue3 = digitalRead(irSensorPin3);

  if (sensorValue1 == LOW) {
    digitalWrite(ledPin1, HIGH);   // Turn on the LED
    ir1 = "terisi";
    if (Firebase.setString(firebaseData, "/slot-parkir/ir1", ir1)) {
      Serial.println("Path: " + firebaseData.dataPath());
      Serial.println("Type: " + firebaseData.dataType());
    } else {
      Serial.println("Reason: " + firebaseData.errorReason());
    }
  } else {
    digitalWrite(ledPin1, LOW);   // Turn off the LED
    ir1 = "kosong";
    if (Firebase.setString(firebaseData, "/slot-parkir/ir1", ir1)) {
      Serial.println("Path: " + firebaseData.dataPath());
      Serial.println("Type: " + firebaseData.dataType());
    } else {
      Serial.println("Reason: " + firebaseData.errorReason());
    }
  }
  
  if (sensorValue2 == LOW) {
    digitalWrite(ledPin2, HIGH);   // Turn on the LED
    ir2 = "terisi";
    if (Firebase.setString(firebaseData, "/slot-parkir/ir2", ir2)) {
      Serial.println("Path: " + firebaseData.dataPath());
      Serial.println("Type: " + firebaseData.dataType());
    } else {
      Serial.println("Reason: " + firebaseData.errorReason());
    }
  } else {
    digitalWrite(ledPin2, LOW);    // Turn off the LED
    ir2 = "kosong";
    if (Firebase.setString(firebaseData, "/slot-parkir/ir2", ir2)) {
      Serial.println("Path: " + firebaseData.dataPath());
      Serial.println("Type: " + firebaseData.dataType());
    } else {
      Serial.println("Reason: " + firebaseData.errorReason());
    }
  }
  
  if (sensorValue3 == LOW) {
    digitalWrite(ledPin3, HIGH);   // Turn on the LED
    ir3 = "terisi";
    if (Firebase.setString(firebaseData, "/slot-parkir/ir3", ir3)) {
      Serial.println("Path: " + firebaseData.dataPath());
      Serial.println("Type: " + firebaseData.dataType());
    } else {
      Serial.println("Reason: " + firebaseData.errorReason());
    }
  } else {
    digitalWrite(ledPin3, LOW);    // Turn off the LED
    ir3 = "kosong";
    if (Firebase.setString(firebaseData, "/slot-parkir/ir3", ir3)) {
      Serial.println("Path: " + firebaseData.dataPath());
      Serial.println("Type: " + firebaseData.dataType());
    } else {
      Serial.println("Reason: " + firebaseData.errorReason());
    }
  }
}
