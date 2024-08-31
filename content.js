
console.log("hello");
// List of anime quotes
const quotes = [
    "I'll take a potato chip... and eat it! - Light Yagami, Death Note",
    "I'm not a hero because I want your approval. I do it because I want to! - Izuku Midoriya, My Hero Academia",
    "People’s lives don’t end when they die, it ends when they lose faith. - Itachi Uchiha, Naruto",
  ];
  
  // Function to show a random anime quote as an alert
  function showQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    alert(quotes[randomIndex]);
  }
  