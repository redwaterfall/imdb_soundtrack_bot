const puppeteer = require('puppeteer');

let url = 'https://www.imdb.com/';
let movieTitle = "Gladiator"; ////Once Upon a Time... in Hollywood //The Young Pope //Narcos
 async function soundtrack(movietitle){

  try{  
        const browser = await puppeteer.launch({headless:false});
        const page = await browser.newPage();
        await page.goto(url);

        
        await page.waitForSelector('#suggestion-search');

        await page.click('#nav-search-form > div.SearchCategorySelector__StyledContainer-sc-18f40f7-0.fEgMct.search-category-selector');//opens the left select bar
        await page.click('#navbar-search-category-select-contents > ul > a:nth-child(2)');// selects title as the search option
        await page.$eval('#suggestion-search', (el,title) => el.value = title, movietitle); //sets the movie title in the input field
        await page.click('#suggestion-search-button > svg');// clicks the search button

        

        await page.waitForSelector('#main');
        const elements = await page.$x('//*[@id="main"]/div/div[2]/table/tbody/tr[1]/td[2]/a')
        await elements[0].click() 
                                    
        await page.waitForSelector('#__next > main');
            let currentURL = page.url();
            
            
                        let times = 0;
                        let newUrl="";
                        for(let i = 0; i < currentURL.length;i++){
                            if(currentURL[i] == '/'){
                                times+=1;
                            }
                            if(times < 5){
                                newUrl += currentURL[i];
                            }

                        }
                        console.log('newUrl ' + newUrl);
                        newUrl = newUrl+ '/soundtrack'
                    
            
            await page.goto(newUrl);
            await page.waitForXPath('//*[@id="soundtracks_content"]/div');
            const [list] = await page.$x('//*[@id="soundtracks_content"]/div');
            let value = await page.evaluate(el => el.innerText, list)
            console.log( value);
            return value;

            
        }
        catch(err){
            console.log(err)
        }
                
    
}

soundtrack(movieTitle)