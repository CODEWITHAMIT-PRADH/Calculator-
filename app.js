let input = "";
let pinHash = localStorage.getItem("pinHash");

if (!pinHash) {
  const pin = prompt("Set your secret PIN");
  localStorage.setItem("pinHash", CryptoJS.SHA256(pin).toString());
  alert("PIN Set");
}

function press(val) {
  if (val === "=") checkPin();
  else input += val;
  document.getElementById("display").value = input;
}

function checkPin() {
  if (CryptoJS.SHA256(input).toString() === localStorage.getItem("pinHash")) {
    document.getElementById("calculator").style.display = "none";
    document.getElementById("vault").style.display = "block";
  } else {
    document.getElementById("display").value = eval(input);
  }
  input = "";
}

function encryptFile(data, pin) {
  return CryptoJS.AES.encrypt(data, pin).toString();
}

async function upload() {
  const file = document.getElementById("fileInput").files[0];
  const reader = new FileReader();

  reader.onload = async () => {
    const pin = prompt("Enter PIN to encrypt");
    const encrypted = encryptFile(reader.result, pin);

    await fetch("http://localhost:3000/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: encrypted })
    });

    alert("Encrypted & Uploaded");
  };

  reader.readAsDataURL(file);
}
