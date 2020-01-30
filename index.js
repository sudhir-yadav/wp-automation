/**
 * Sudhir Yadav 
 * 28th jan 2020
 * WP Automation
 */

const pw     = require('playwright');
const dotenv = require('dotenv').config();



(async () => {
  const browser = await pw.webkit.launch( { headless: false } ); // or 'chromium', 'firefox'
  //const browser = await pw.webkit.launch(); // or 'chromium', 'firefox'
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.setViewport({ width: 1280, height: 800 })

  let url = process.env.WP_URL ; 

  if( 'true' === process.env.HTTP_AUTH ){
      url = process.env.HTTP_AUTH_USER + ':'+process.env.HTTP_AUTH_PASS+"@"+url;
  }

  await page.goto( 'https://'+url+'/wp-admin/' );

  const userField   = await page.$('#user_login');
  const passField   = await page.$('#user_pass');
  const loginButton = await page.$('#wp-submit');

  await userField.fill( 'mldemo' );
  await passField.type( 'mldemo#123');
  await page.screenshot( { path: './images/userpassword.png' } );
  await loginButton.click('button', {delay: 500});
  await page.waitForNavigation();
  
  await page.screenshot({ path: './images/wp-admin.png' }); 

  const create_post = await page.$( '#menu-posts' );
  create_post.click();
  await page.screenshot({ path: './images/wp-admin.png' }); 

  await Promise.all([
    await page.click( '.page-title-action' )
  ]);
  await page.waitForNavigation();
  await page.screenshot({ path: './images/app.png' }); 
  //await page.evaluate(() => { document.querySelector('.page-title-action')[1].click(); });

  await browser.close( {delay: 2000} );
})();