(function () {
    console.log("Якщо ім'я починається з літери J або j, виводимо 'Good Bye', інакше - 'Hello'.");
    
    let names = ["Bill", "John", "Jen", "Jason", "Paul", "Frank", "Steven", "Larry", "Paula", "Laura", "Jim"];
    
    for (let i = 0; i < names.length; i++) {
      let firstLetter = names[i].charAt(0).toLowerCase();
  
      if (firstLetter === 'j') {
        byeSpeaker.speak(names[i]);
      } else {
        helloSpeaker.speak(names[i]);
      }
    }
  
  console.log("Якщо ім'я закінчується на голосну літеру (a, e, i, o, u, y), виводимо 'Hello', інакше — 'Good Bye'.");

  for (let k = 0; k < names.length; k++) {
    let currentName = names[k];
    
    let lastLetter = currentName.charAt(currentName.length - 1).toLowerCase();

    if (lastLetter === 'a' || lastLetter === 'e' || lastLetter === 'i' || lastLetter === 'o' || lastLetter === 'u' || lastLetter === 'y') {
      console.log("Hello " + currentName);
    } else {
      console.log("Good Bye " + currentName);
    }
  }
  
  })();