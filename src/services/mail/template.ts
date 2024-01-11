export function mailTemplate (name: string, token: string) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify your email</title>
  </head>
  <body>
      <div style="background-color: #111; width: 100%; height: 300px; font-family: sans-serif; padding: 10px; text-align: center;">
        <h1 style="color: #fff;">Hi 👋 <span style="color: #7648ffc7;">${name}</span></h1>
        <p style="font-size: 20px; color: #ddd;">It is great that you consider using our services, we offer the best audio quality and without any type of compression totally free</p>
        <p style="font-size: 20px; color: #ddd;">Please click on the link below to verify your email address:</p>
        <a style="text-decoration: none; color: #fff; border: 2px solid #7648ffc7; border-radius: 10px; padding: 15px; background: transparent; cursor: pointer; font-size: 15px;" href="https://p-final-p-ccorp-front.vercel.app/verify/?token=${token}">verify yourself now</a>
      </div>
  </body>
  </html>
    `;
}
