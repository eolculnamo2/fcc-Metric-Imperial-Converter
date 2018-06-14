const express = require('express')
const bodyParser = require('body-parser')
const convert = require('convert-units')
const helmet = require('helmet')
const app = express()

app.use(helmet())
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/',(req,res)=>{
	res.sendFile(__dirname+'public/index.html')
})

const conversionTable = {
	gal: 'L',
	L: 'gal',
	lbs: 'kg',
	kg: 'lbs',
	mi: 'km',
	km: 'mi'
}

app.post('/convert',(req,res)=>{
	let inp = req.body.data
	let arr = []

	for(let i in inp){
		if(isNaN(Number(inp[i])) && inp[i] != '.' && inp[i] != '/'){
			arr = [inp.slice(0,i),inp.slice(i,inp.length)]
			break
		}
	}
	if(arr[0].split('/') != undefined){
		if(arr[0].split('/').length == 2){
			let a = arr[0].split('/')
			arr[0] = a[0] / a[1]
		}
	}

	let newUnit = conversionTable[arr[1]];
	if(newUnit == undefined && isNaN(Number(arr[0]))){
		res.send({string: 'invalid number and unit'})
	}
	else if(newUnit == undefined){
		res.send({string: 'Invalid Unit'})
	}
	else if(isNaN(Number(arr[0]))){
		res.send({string: 'Invalid Number'})
	}

	let conversion = convert(arr[0]).from(arr[1]).to(newUnit);

	let payload ={
		initNum: arr[0],
		initUnit: arr[1],
		returnNum: conversion,
		returnUnit: newUnit,
		get string() {
			return this.initNum+' '+this.initUnit + ' converts to '+ this.returnNum+' '+this.returnUnit
			}
		}
	
	res.send(payload)
})

app.listen(3000,()=>{
	console.log("Listening")
})
