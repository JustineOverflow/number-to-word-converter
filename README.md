# Number to Word lists converter

You can find in this repository the completion of the test, which converts a number into a list of corresponding words, in the style of T9.  

## App Demo

You can find a demo video of the converter app via this link: 
https://drive.google.com/file/d/1spd5vjegqxrbrtebd8oCtcHzAsYtrxZG/view?usp=sharing

## My Approach


### Testing

I implemented tests on the server side to test the converter algorithm and the API server. 

There are also tests for data validation. Example: if the user inserts a "1" or "0", the server should send back an appropriate error message. 

### Technologies 

#### Frontend

- React
- Sass: I used SASS as CSS preprocessor, to have a code more structured, less repeated and easier to write/read.

#### Backend

- Node
- NestJS: I used NestJS which is a popular framework built on top of ExpressJs/NodeJs, and uses Typescript.

### To convert the number into a list of words

For the algorithm, I decided to use a Hashmap to store the digits (as a key) and easily access their appropriate letters (as a value). The reason behind is to have a lookup complexity time of O(1).

For the filtering option, I used a JSON file with a list of all the existing english words. This file is a dictionary, which enable me to check each word of the list with a complexity time of 0(1). 

## Set-up and installation

To run the project on your local machine, you can use the following commands:

To run the backend:

```
cd ./backend
npm install
npm run start:dev
```

To run the frontend:

```
cd ../frontend
npm install
npm start
```

## Versions

- Node: 13.12.0
- React: 16.13.1
- Nest: 7.5.1

## Thank you