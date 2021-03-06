tday=new Array("Sun","Mon","Tue","Wed","Thu","Fri","Sat");
tmonth=new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
function GetClock(){
	var d=new Date();
	var nday=d.getDay(),nmonth=d.getMonth(),ndate=d.getDate();

	var nhour=d.getHours(),nmin=d.getMinutes(),nsec=d.getSeconds();



	if(nmin<=9) nmin="0"+nmin;
	if(nsec<=9) nsec="0"+nsec;

	document.getElementById('clockdate').innerHTML=""+tday[nday]+" "+ndate+" "+tmonth[nmonth]+" ";
	document.getElementById('clocktime').innerHTML=""+nhour+":"+nmin+"/"+nsec+"";
}

var curr = 100;

function HandlePage() {
	
	var count = 0;

	$(document).keypress(function (e) {
    var key = e.keyCode || e.charCode;
    if (key >= 48 && key <= 57) {
    	
    	switch(count) {
    		case 0:
                if((key-48) != 0) {
    			   curr = (key - 48);
                   count++;
                }
    			break;
    		case 1:
                curr*= 10;
    			curr += (key - 48);
                count++;
    			break;
    		case 2:
                curr*= 10;
    			curr += (key - 48);
    			count = 0;
                document.getElementById('page').innerHTML = curr;
                loadPage(curr); 
    			break;
    	}
    	document.getElementById('page-number').innerHTML = curr;
    }
});
}

function loadPage(page) {
    if(curr==100) {
        homePage();
   
    } else if(curr >= 104 && curr <= 115)  {
        loadStory('HEADLINES');
    } else if(curr >= 161 && curr <= 172) {
        loadStory('LONDON');
    } else if(curr >= 201 && curr <= 212) {
        loadStory('BUSINESS');
    } else if (curr >= 303 && curr <= 314) {
        loadStory('FOOTBALL');
    } else if (curr >= 320 && curr <= 331) {
        loadStory('SPORT');
    } else if (curr >= 341 && curr <= 352) {
        loadStory('CRICKET');
    } else if(curr >= 371 && curr <= 379) {
        loadStory('RUBGY UNION');
    } else if(curr >= 381 && curr <= 389) {
        loadStory('RUBGY LEAGUE');
    } else if (curr >= 481 && curr <= 489) {
        loadStory('TENNIS');
    } else if (curr >= 501 && curr <= 512) {
        loadStory('ENTERTAINMENT');
    

    } else if(curr == 101) {
        loadHeadlines('HEADLINES','http://feeds.bbci.co.uk/news/rss.xml',104);
    } else if(curr == 200) {
        loadHeadlines('BUSINESS','http://feeds.bbci.co.uk/news/business/rss.xml',201);
    } else if(curr == 160) {
        loadHeadlines('LONDON','http://feeds.bbci.co.uk/news/england/london/rss.xml',161);
    } else if(curr == 199) {
        indexPage();
    } else if(curr == 300) {
        sportHomePage();
    } else if(curr == 301) {
        loadHeadlines('SPORT','http://feeds.bbci.co.uk/sport/0/rss.xml',320);
    } else if(curr == 302) {
        loadHeadlines('FOOTBALL','http://feeds.bbci.co.uk/sport/0/football/rss.xml',303);
    } else if (curr == 340) {
         loadHeadlines('CRICKET','http://feeds.bbci.co.uk/sport/0/cricket/rss.xml',341);
    } else if (curr == 370) {
         loadHeadlines('RUBGY UNION','http://feeds.bbci.co.uk/sport/0/rugby-union/rss.xml',371);
    } else if (curr == 380) {
         loadHeadlines('RUBGY LEAGUE','http://feeds.bbci.co.uk/sport/0/rugby-league/rss.xml',381);
    }else if (curr == 480) {
        loadHeadlines('TENNIS','http://feeds.bbci.co.uk/sport/0/tennis/rss.xml',481)
    
    } else if(curr == 500) {
        loadHeadlines('ENTERTAINMENT','http://feeds.bbci.co.uk/news/entertainment_and_arts/rss.xml',501);
    } else {
        notFound();
    }
    
}

function homePage() {
    PageIndex([['A-Z INDEX','199'], ['CRICKET','340'], ['ENTERTAINMENT','500'], ['FINANCE','200'], ['FOOTBALL','302'],
     ['NEWS HEADLINES','101'], ['NEWS FOR REGION','160'], ['RUGBY LEAGUE','380'], ['RUGBY UNION','370'],
     ['SPORT','300'], ['TENNIS','480'], ['','']]);
}

function indexPage() {
    PageIndex([['CRICKET','340'], ['ENTERTAINMENT','500'], ['FINANCE','200'], ['FOOTBALL','302'],
     ['NEWS HEADLINES','101'], ['NEWS FOR REGION','160'], ['RUGBY LEAGUE','380'], ['RUGBY UNION','370'],
     ['SPORT','300'], ['TENNIS','480']]);
}

function sportHomePage() {
    PageIndex([['MAIN HEADLINES','301'], ['RACING','660'], ['FOOTBALL','302'],['CRICKET','340'],
        ['MOTORSPORT','360'], ['TV/INTERACTAIVE','389'], ['RUGBY UNION','370'],['NEWS HEADLINES','101'],
        ['RUGBY LEAGUE','370'], ['WEAHTER','400'], ['TENNIS','480'],['ENTERTAINMENT','500']]);
}

function PageIndex(data) {
        document.getElementById('ceefax-text').innerHTML = 'CEEFAX';
        document.getElementById('main-body').innerHTML = '';
        var bod = document.getElementById('main-body');
        var headline = document.createElement('div'); headline.className="headline";
        
        var sub = document.createElement('div'); sub.className="headline-sub"; sub.innerHTML = "London Extra";
        var headtext = document.createElement('div'); headtext.className="headline-text"; headtext.innerHTML = 'NEWS OF REGIONAL TV AND LOCAL RADIO <span class="headline-sub">170</span>';
        var hrbreak = document.createElement('hr'); hrbreak.className="ceefax-break";

        headline.appendChild(sub); headline.appendChild(headtext);
        bod.appendChild(headline);
        bod.appendChild(hrbreak);

        bod.appendChild(createIndexTable(data));
}


function createIndexTable(indexData) {
    var table = document.createElement('div'); table.className="table";
    for(i = 0; i < indexData.length; i+=2) {
        var row = document.createElement('div'); row.className="table-row";
        var aTitle = document.createElement('div'); aTitle.className="table-cell-yel"; aTitle.innerHTML = indexData[i][0];
        var aPage = document.createElement('div'); aPage.className="table-cell"; aPage.innerHTML = indexData[i][1];
        var bTitle = document.createElement('div'); bTitle.className="table-cell-yel"; bTitle.innerHTML = indexData[i+1][0];
        var bPage = document.createElement('div'); bPage.className="table-cell"; bPage.innerHTML = indexData[i+1][1];
        row.appendChild(aTitle); row.appendChild(aPage); row.appendChild(bTitle); row.appendChild(bPage);
        table.appendChild(row);
    }
    return table;
}

function loadHeadlines(title,feed,start) {
        document.getElementById('ceefax-text').innerHTML = title;
        document.getElementById('main-body').innerHTML = '';
        var bod = document.getElementById('main-body');
        var feeds = document.createElement('div'); feeds.id = "rss-feeds";
        bod.appendChild(feeds);
     jQuery(function($) {
        var count = start-1
        var first = false;
        $("#rss-feeds").rss(feed,  {
    limit: 12,
    tokens: {
      teletextentry: function(entry, tokens) { 
        count++;
            if(!first) {
                first = true;
                return '<div class="table-row"><div class="headline-cell"><span class="headline-text">'+entry.title.toUpperCase()+'</span><br>'+entry.content+'</div><div class="table-cell"><span class="headline-number">'+count+'</span></div></div>';
            } else {
                return '<div class="table-row"><div class="headline-cell">'+entry.title+'</div><div class="table-cell-yel">'+count+'</div></div>';
            }
        }
    },
    layoutTemplate: '<div class="table">{entries}</div>',
    entryTemplate: '{teletextentry}',

})
      });
}

function notFound() {
    document.getElementById('ceefax-text').innerHTML = "404";
    document.getElementById('main-body').innerHTML = '<p class="error">Error! Page does not exist, try another one!</p><p>Page 199 contains an index!</p>';    
}

function loadStory(title) {
    document.getElementById('ceefax-text').innerHTML = title;
    document.getElementById('main-body').innerHTML = '';
    var bod = document.getElementById('main-body');
    var tit = document.createElement('div'); tit.id = "headline-sub";
    var art = document.createElement('div'); art.id = "main-text";
    bod.appendChild(tit);
    bod.appendChild(art);

    var title = '';
    var article = '';

$.getJSON( "http://localhost:8080", { page: curr },  function( data ) {

  var items = [];
  $.each( data, function( key, val ) {
    items.push(val);
  });
  title = '<div class="headline-sub">'+items[0]+'</span></div>'
  for(i = 1; i < items.length; i++) {
    article += '<p>'+items[i]+'</p>'
  }
  article += "\n";

  document.getElementById('headline-sub').innerHTML = title; 
  document.getElementById('main-text').innerHTML = article;
}

);
}

window.onload=function(){
GetClock();
HandlePage();
homePage();
setInterval(GetClock,1000);
}