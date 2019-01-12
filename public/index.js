'use strict';

//list of bats
//useful for ALL 5 steps
//could be an array of objects that you fetched from api or database
const bars = [{
  'id': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'name': 'freemousse-bar',
  'pricePerHour': 50,
  'pricePerPerson': 20
}, {
  'id': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'name': 'solera',
  'pricePerHour': 100,
  'pricePerPerson': 40
}, {
  'id': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'name': 'la-poudriere',
  'pricePerHour': 250,
  'pricePerPerson': 80
}];

//list of current booking events
//useful for ALL steps
//the time is hour
//The `price` is updated from step 1 and 2
//The `commission` is updated from step 3
//The `options` is useful from step 4
const events = [{
  'id': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'booker': 'esilv-bde',
  'barId': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'time': 4,
  'persons': 8,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}, {
  'id': '65203b0a-a864-4dea-81e2-e389515752a8',
  'booker': 'societe-generale',
  'barId': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'time': 8,
  'persons': 30,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}, {
  'id': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'booker': 'otacos',
  'barId': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'time': 5,
  'persons': 80,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}];

//list of actors for payment
//useful from step 5
const actors = [{
  'eventId': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'eventId': '65203b0a-a864-4dea-81e2-e389515752a8',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'eventId': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}];

function setPrice(bars,events){
	var pas;
	var pas2;
	var priceHour; var pricePersonn;
	for (pas = 0; pas < events.length; pas++) {
	var barId=events[pas].barId;
	for (pas2 = 0; pas2<bars.length;pas2++){
		if(bars[pas2].id==barId){
		priceHour=bars[pas2].pricePerHour;
		pricePersonn=bars[pas2].pricePerPerson;
			}
		}
		if(events[pas].persons>9 && events[pas].persons<20) events[pas].price=events[pas].time*priceHour+events[pas].persons*pricePersonn*0.90;
		else if(events[pas].persons>19 && events[pas].persons<60) events[pas].price=events[pas].time*priceHour+events[pas].persons*pricePersonn*0.70;
		else if(events[pas].persons>59 ) events[pas].price=events[pas].time*priceHour+events[pas].persons*pricePersonn*0.50;
		else events[pas].price=events[pas].time*priceHour+events[pas].persons*pricePersonn;
	
	}
}

function setCommission(events){
	var i,comm;
	for (i=0;i<events.length;i++){
		comm=events[i].price*0.30;
		comm=comm/2;
		events[i].commission.insurance=comm;
		events[i].commission.treasury=events[i].persons;
		comm=comm-events[i].persons;
		events[i].commission.privateaser=comm;
	}
}

function ifDeductible(events){
	var i;
	for (i=0;i<events.length;i++){
		if(events[i].options.deductibleReduction) events[i].price=events[i].price+events[i].persons;
	}
}

function actorsPayement(events, actors){
	var i,comm,commInsurance,commTreasury,commPrivateam,bookerDebit;
	for (i=0;i<events.length;i++){
		comm=events[i].price*0.30;
		commInsurance=comm/2;
		commTreasury=events[i].persons;
		commPrivateam=commInsurance-events[i].persons;
		if(events[i].options.deductibleReduction) bookerDebit=events[i].price+events[i].persons;
		else bookerDebit=events[i].price;
		
		actors[i].payment[0].amount=bookerDebit;
		actors[i].payment[1].amount=events[i].price-comm;
		actors[i].payment[2].amount=commInsurance;
		actors[i].payment[3].amount=commTreasury;
		if(events[i].options.deductibleReduction) actors[i].payment[4].amount=commPrivateam+events[i].persons;
		else actors[i].payment[4].amount=commPrivateam;
		
		
	}
}

setPrice(bars, events);
actorsPayement(events,actors);
setCommission(events);
ifDeductible(events);
console.log(bars);
console.log(events);
console.log(actors);
