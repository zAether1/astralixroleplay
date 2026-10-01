const fs = require('fs');

async function testTip4Serv() {
  const apiKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwZXJtaXNzaW9ucyI6eyJjcmVhdGUiOltdLCJyZWFkIjpbXSwidXBkYXRlIjpbXSwiZGVsZXRlIjpbXSwiMCI6ImNyZWF0ZS1hbGwiLCIxIjoicmVhZC1hbGwiLCIyIjoidXBkYXRlLWFsbCIsIjMiOiJkZWxldGUtYWxsIn0sIndobyI6MjM3NDYsImlzcyI6Imh0dHBzOi8vdGlwNHNlcnYuY29tIiwiYXVkIjoiaHR0cHM6Ly9hcGkudGlwNHNlcnYuY29tIiwibmJmIjoxNzkwODIxMzI1LCJpYXQiOjE3OTA4MjEzMjV9.zod3wZD8D_G1f8bhdAxAcCa3ryLaufWnhayI-zn4Suo";

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${apiKey}`
  };

  try {
    const prodRes = await fetch("https://api.tip4serv.com/v1/products", { headers });
    const prodData = await prodRes.json();
    console.log("/products:", prodData);
  } catch (e) {}
}

testTip4Serv();
