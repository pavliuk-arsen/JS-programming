// car1
//-------1.2.3-------
var car1 = new Object();

car1.color = "Yellow";
car1.maxSpeed = 180;

car1.driver = new Object();
car1.driver.name = "Arsen Pavliuk";
car1.driver.category = "C";
car1.driver["personal limitations"] = "No driving at night";

car1.tuning = true;
car1["number of accidents"] = 0;

console.log(car1);
//-------1.2.5-------
car1.drive = function() {
    console.log("I am not driving at night");
  };

car1.drive();

// car2
//-------1.2.4-------
var car2 = {
    color: "Black",
    maxSpeed: 240,
    driver: {
      name: "Arsen Pavliuk",
      category: "B",
      "personal limitations": "null"
    },
    tuning: false,
    "number of accidents": 2
  };

  console.log(car2);
//-------1.2.6-------
car2.drive = function() {
    console.log("I can drive anytime");
  };

car2.drive();

//-------1.2.7-------
function Truck(color, weight, avgSpeed, brand, model) {

    this.color = color;
    this.Weight = weight; 
    this.avgSpeed = avgSpeed;
    this.brand = brand;
    this.model = model;
//-------1.2.9-------
    this.trip = function() {
        
        if (!this.driver) {
          console.log("No driver assigned");
        } else {

          var message = "Driver " + this.driver.name + " ";
          
          if (this.driver.nightDriving) {
            message += "drives at night";
          } else {
            message += "does not drive at night";
          }
          
          message += " and has " + this.driver.expirience + " years of experience";
          
          console.log(message);
        }
      };
  }
  
  var myTruck = new Truck("White", 8100, 85, "Scania", "r450");
  
  console.log(myTruck);
//-------1.2.8--------
  Truck.prototype.AssignDriver = function(name, nightDriving, expirience) {
    
    this.driver = {
      name: name,
      nightDriving: nightDriving,
      expirience: expirience
    };
  };
  
console.log("--- Перший виклик ---");// до додавання водія
myTruck.trip(); 

myTruck.AssignDriver("Arsen Pavliuk", true, 7);

console.log("--- Другий виклик ---");// після додавання водія
myTruck.trip();

//-------1.2.10-------

var truck1 = new Truck("Blue", 10000, 80, "DAF", "XF");

truck1.AssignDriver("Arsen Pavliuk", true, 8);

var truck2 = new Truck("Black", 12000, 75, "Scania", "R500");

truck2.AssignDriver("Arsen Pavliuk", false, 15);


console.log("--- Результат для першої вантажівки ---");
truck1.trip(); 

console.log("--- Результат для другої вантажівки ---");
truck2.trip();

//-------1.2.12-------
class Square {
    //-------1.2.13-------
    constructor(a) {
      this.a = a; 
    }
    //-------1.2.14-------
    static help() {
        console.log(`Довідка про фігуру "Квадрат":
    - Квадрат — це правильний чотирикутник, у якого всі сторони рівні.
    - Всі кути квадрата є прямими (90 градусів).
    - Діагоналі квадрата рівні, перетинаються під прямим кутом і діляться точкою перетину навпіл.
    - Формула периметра: P = 4 * a
    - Формула площі: S = a^2`);
      }
    //-------1.2.15-------
    length() {
        const perimeter = this.a * 4;
        console.log(`Сума довжин сторін (периметр): ${perimeter}`);
      }
    
      square() {
        const area = this.a ** 2; 
        console.log(`Площа квадрата: ${area}`);
      }
    
      info() {
        console.log(`--- Характеристика квадрата ---`);
        console.log(`Довжини всіх 4 сторін: ${this.a}, ${this.a}, ${this.a}, ${this.a}`);
        console.log(`Величини всіх 4 кутів: 90°, 90°, 90°, 90°`);
        console.log(`Сума довжин сторін: ${this.a * 4}`);
        console.log(`Площа: ${this.a ** 2}`);
      }
  }
  
 
//-------1.2.16-------
class Rectangle extends Square {
     //-------1.2.17-------
    constructor(a, b) {
      super(a); 
      this.b = b; 
    }

    static help() {
        console.log(`Довідка про фігуру "Прямокутник":
    - Прямокутник — це чотирикутник, у якого всі кути прямі (по 90 градусів).
    - Протилежні сторони попарно рівні та паралельні.
    - Формула периметра: P = 2 * (a + b)
    - Формула площі: S = a * b`);
      }
    
      length() {
        const perimeter = 2 * (this.a + this.b);
        console.log(`Сума довжин сторін (периметр прямокутника): ${perimeter}`);
      }
    
      square() {
        const area = this.a * this.b;
        console.log(`Площа прямокутника: ${area}`);
      }
    
      info() {
        console.log(`--- Характеристика прямокутника ---`);
        console.log(`Довжини всіх 4 сторін: ${this.a}, ${this.b}, ${this.a}, ${this.b}`);
        console.log(`Величини всіх 4 кутів: 90°, 90°, 90°, 90°`);
        console.log(`Сума довжин сторін: ${2 * (this.a + this.b)}`);
        console.log(`Площа: ${this.a * this.b}`);
      }
  }


  //-------1.2.18-------
  class Rhombus extends Square {
    //-------1.2.19-------
    constructor(a, alpha, beta) {
      super(a); 
      this.alpha = alpha; 
      this.beta = beta;
    }

    //-------1.2.22-------
    get a() {
        return this._a;
      }
      
      set a(value) {
        if (value <= 0) {
          console.error("Помилка: Сторона ромба має бути додатнім числом.");
          return;
        }
        this._a = value;
      }
    
      get alpha() {
        return this._alpha;
      }
      
      set alpha(value) {
        if (value <= 90 || value >= 180) {
          console.error("Помилка: Тупий кут має бути в межах від 90° до 180°.");
          return;
        }
        this._alpha = value;
      }
    
      get beta() {
        return this._beta;
      }
      
      set beta(value) {
        if (value <= 0 || value >= 90) {
          console.error("Помилка: Гострий кут має бути в межах від 0° до 90°.");
          return;
        }
        this._beta = value;
      }

    static help() {
        console.log(`Довідка про фігуру "Ромб":
    - Ромб — це паралелограм, у якого всі сторони рівні.
    - Протилежні кути рівні, сума кутів, прилеглих до однієї сторони, дорівнює 180°.
    - Діагоналі перетинаються під прямим кутом і є бісектрисами його кутів.
    - Формула периметра: P = 4 * a
    - Формула площі: S = a^2 * sin(alpha)`);
      }

    length() {
        const perimeter = 4 * this.a;
        console.log(`Сума довжин сторін (периметр ромба): ${perimeter}`);
      }
      square() {
        const radians = (this.beta * Math.PI) / 180;
        
        const area = (this.a ** 2) * Math.sin(radians);
        
        console.log(`Площа ромба: ${area.toFixed(2)}`);
      }
    
      info() {
        const radians = (this.beta * Math.PI) / 180;
        const area = (this.a ** 2) * Math.sin(radians);
    
        console.log(`--- Характеристика ромба ---`);
        console.log(`Довжини сторін: ${this.a}, ${this.a}, ${this.a}, ${this.a}`);
        console.log(`Величини кутів: ${this.alpha}°, ${this.beta}°, ${this.alpha}°, ${this.beta}°`);
        console.log(`Сума довжин сторін: ${this.a * 4}`);
        console.log(`Площа: ${area.toFixed(2)}`);
      }
  }
  
  //-------1.2.20-------
  class Parallelogram extends Rectangle {
    constructor(a, b, alpha, beta) {
      super(a, b); 
      this.alpha = alpha; 
      this.beta = beta;   
    }

    //-------1.2.21-------
    static help() {
        console.log(`Довідка про фігуру "Паралелограм":
    - Паралелограм — це чотирикутник, протилежні сторони якого попарно паралельні та рівні.
    - Протилежні кути рівні, а сума кутів, прилеглих до однієї сторони, дорівнює 180°.
    - Формула периметра: P = 2 * (a + b)
    - Формула площі: S = a * b * sin(beta)`);
      }
    
      length() {
        const perimeter = 2 * (this.a + this.b);
        console.log(`Сума довжин сторін (периметр паралелограма): ${perimeter}`);
      }
    
      square() {
        const radians = (this.beta * Math.PI) / 180;
        
        const area = this.a * this.b * Math.sin(radians);
        
        console.log(`Площа паралелограма: ${area.toFixed(2)}`);
      }
    
      info() {
        const perimeter = 2 * (this.a + this.b);
        const radians = (this.beta * Math.PI) / 180;
        const area = this.a * this.b * Math.sin(radians);
    
        console.log(`--- Характеристика паралелограма ---`);
        console.log(`Довжини сторін: ${this.a}, ${this.b}, ${this.a}, ${this.b}`);
        console.log(`Величини кутів: ${this.alpha}°, ${this.beta}°, ${this.alpha}°, ${this.beta}°`);
        console.log(`Сума довжин сторін: ${perimeter}`);
        console.log(`Площа: ${area.toFixed(2)}`);
      }
  }

//-------1.2.23-------
Square.help();
Rectangle.help();
Rhombus.help();
Parallelogram.help();

//-------1.2.24-------
const mySquare = new Square(6);
mySquare.info();
const myRectangle = new Rectangle(10, 5);
myRectangle.info();
const myRhombus = new Rhombus(10, 120, 60);
myRhombus.info();
const myParallelogram = new Parallelogram(10, 5, 120, 60);
myParallelogram.info();

//-------1.2.25-------
const Triangular = (a = 3, b = 4, c = 5) => {
    return { a, b, c };
  };

//-------1.2.26-------
const triangle1 = Triangular();
const triangle2 = Triangular(6, 8, 10);
const triangle3 = Triangular(5, 12, 13);

console.log("Перший об'єкт (за замовчуванням):", triangle1);
console.log("Другий об'єкт:", triangle2);
console.log("Третій об'єкт:", triangle3);

//-------1.2.27-------
const PiMultiplier = num => () => Math.PI * num;
//-------1.2.28-------
const multiplyByTwo = PiMultiplier(2);
const multiplyByTwoThirds = PiMultiplier(2 / 3);
const divideByTwo = PiMultiplier(1 / 2);

console.log("Результат π * 2:", multiplyByTwo()); 
console.log("Результат π * (2/3):", multiplyByTwoThirds()); 
console.log("Результат π / 2:", divideByTwo());

//-------1.2.29-------
const Painter = (color) => {
    return (obj) => {
      if (obj && 'type' in obj) {
        console.log(`Колір: ${color}, Тип: ${obj.type}`);
      } else {
        console.log("No 'type' property occurred!");
      }
    };
  };
  const PaintBlue = Painter("синій");
  const PaintRed = Painter("червоний");
  const PaintYellow = Painter("жовтий");

//-------1.2.30-------
const object1 = {
    maxSpeed: 280,
    type: "Sportcar",
    color: "magenta"
  };
  
  const object2 = {
    type: "Truck",
    "avg speed": 90,   
    "load capacity": 2400 
  };
  
  const object3 = {
    maxSpeed: 180,
    color: "purple",
    isCar: true
  };
  
  // --- 2. Демонстрація роботи функцій ---
  
  console.log("=== Тестування Об'єкта 1 ===");
  PaintBlue(object1);
  PaintRed(object1);
  PaintYellow(object1);
  
  console.log("\n=== Тестування Об'єкта 2 ===");
  PaintBlue(object2);
  PaintRed(object2);
  PaintYellow(object2);
  
  console.log("\n=== Тестування Об'єкта 3 ===");
  PaintBlue(object3);
  PaintRed(object3);
  PaintYellow(object3);
