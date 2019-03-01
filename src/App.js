import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { Bar, Doughnut } from 'react-chartjs-2';
import './App.css';

class App extends Component {
  state = {
    data: null,
    selectedOption: '',
    searchSuggestionsArr: [],
    searchResultsArr: [],
    noAutoCompleteDuplicateObj: {},
    barData: [],
    barLabels: [75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100],
    doughnutLabels: [
      '1 book',
      '2 books',
      '3+ books'
    ],
    doughnutData: []
  };

  buildSearchSuggestionsArr = () => {
    const searchSuggestionsArr = [];
    const noAutoCompleteDuplicateObj = {};
    const authorBookCountObj = {};
    const authorsNumberOfBooks = { 1: 0, 2: 0, 3: 0};
    const searchResultsArr = this.state.searchResultsArr;

    for (let i = 1; i <= searchResultsArr.length - 1; i++) {

      //prevents duplicate auto suggestions
      if (!noAutoCompleteDuplicateObj[searchResultsArr[i].author]) {
        searchSuggestionsArr.push({ label: 'Author: ' + (searchResultsArr[i].author || 'Anonymous'), value: searchResultsArr[i].author, type: 'author' });
        noAutoCompleteDuplicateObj[searchResultsArr[i].author] = [];
        authorBookCountObj[searchResultsArr[i].author] = 0;
      }

      //assuming no duplicate titles
      if (!noAutoCompleteDuplicateObj[searchResultsArr[i].title]) {
        searchSuggestionsArr.push({ label: 'Title: ' + searchResultsArr[i].title, value: searchResultsArr[i].title, type: 'title' });
        noAutoCompleteDuplicateObj[searchResultsArr[i].title] = [];
      }

      //prevents duplicate auto suggestions
      if (!noAutoCompleteDuplicateObj[searchResultsArr[i].review_score]) {
        searchSuggestionsArr.push({ label: 'Review Score: ' + searchResultsArr[i].review_score, value: searchResultsArr[i].review_score, type: 'review_score' });
        noAutoCompleteDuplicateObj[searchResultsArr[i].review_score] = [];

      }

      //bundles all books with the same author or review score together so we can filter results
      noAutoCompleteDuplicateObj[searchResultsArr[i].author].push(searchResultsArr[i]);
      noAutoCompleteDuplicateObj[searchResultsArr[i].title].push(searchResultsArr[i]);
      noAutoCompleteDuplicateObj[searchResultsArr[i].review_score].push(searchResultsArr[i]);

      //counts how many books each author has
      authorBookCountObj[searchResultsArr[i].author]++;
    }

    //counts how many authors have 1, 2, 3+ books
    for (let key in authorBookCountObj) {
      authorsNumberOfBooks[authorBookCountObj[key]]++
    }

    const doughnutData = [authorsNumberOfBooks[1], authorsNumberOfBooks[2], authorsNumberOfBooks[3]];

    const barData = this.state.barLabels.map((label) => {
      return noAutoCompleteDuplicateObj[label] ? noAutoCompleteDuplicateObj[label].length : 0;
    })

    this.setState({ searchSuggestionsArr, noAutoCompleteDuplicateObj, barData, doughnutData });
  }

  onChangeInput = (e) => {
    this.setState({ selectedOption: e.target.value });
  }

  componentDidMount() {
    //once page loads hit the post request to get books
    this.getBooks()
      .catch(err => console.log(err));
  }

  getBooks = async () => {
    const searchResultsArr = [];

    axios.post('https://di37ol03g7.execute-api.us-west-2.amazonaws.com/dev/')
      .then((res) => {

        //filter book results whose score are higher than 75
        for (let i = 0; i <= res.data.results.length - 1; i++) {
          if (res.data.results[i].review_score > 74) searchResultsArr.push(res.data.results[i]);
        }

        //if there are more than 100 results take the highest scores
        if (searchResultsArr.length > 100) {
          searchResultsArr.sort((a, b) => {
            if (a.review_score < b.review_score)
              return -1;
            if (a.review_score > b.review_score)
              return 1;
            return 0;
          });

          //cut off elements not in highest 100 scores
          searchResultsArr.splice(100);
        }

        //this is to sort by title
        searchResultsArr.sort((a, b) => {
          if (a.title < b.title)
            return -1;
          if (a.title > b.title)
            return 1;
          return 0;
        });

        this.setState({ searchResultsArr });
        this.buildSearchSuggestionsArr();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //this is where the filtering magic happens
  handleChange = (selectedOption) => {
    this.setState({ selectedOption, searchResultsArr: this.state.noAutoCompleteDuplicateObj[selectedOption.value] });
  }


  render() {
    //display book results
    const resultsListItems = this.state.searchResultsArr.map((book, i) => {
      return <li className="row" key={i}>
          <h2>Title: {book.title} </h2>
          <h2>Author: {book.author} </h2>
          <h2>Review Score: {book.review_score} </h2>
          <h3>Book Summary</h3>
          <p>{book.summary}</p>
      </li>
    })

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Top Rated Books!</h1>
        </header>
        <div onKeyUp={this.onChangeInput}>
          <Select
            value={this.state.selectedOption}
            onChange={this.handleChange}
            options={this.state.searchSuggestionsArr}
            />
        </div>
        <button className="btn green" onClick={this.getBooks}>Refresh Books Results</button>
        <div className="container">
          <h2>Books Review Score Bar Graph</h2>
          <Bar
            data={{
              labels: this.state.barLabels,
              datasets: [
                {
                  label: 'Books with this review score',
                  backgroundColor: 'rgba(255,99,132,0.2)',
                  borderColor: 'rgba(255,99,132,1)',
                  borderWidth: 1,
                  hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                  hoverBorderColor: 'rgba(255,99,132,1)',
                  data: this.state.barData
                }
              ]
            }}
            width={100}
            height={50}
            options={{
              maintainAspectRatio: true,
              scales: {
                xAxes: [{}],
                yAxes: [{
                    ticks: {
                      stepSize: 1
                    }
                }]
              }
            }}
            />
        </div>
        <div className="container">
          <h2>Authors With 75+ Review Score Have</h2>
          <Doughnut data={{
              labels: this.state.doughnutLabels,
              datasets: [{
                data: this.state.doughnutData,
                backgroundColor: [
                  '#FF6384',
                  '#36A2EB',
                  '#FFCE56'
                ],
                hoverBackgroundColor: [
                  '#FF6384',
                  '#36A2EB',
                  '#FFCE56'
                ]
              }]
            }} />
        </div>
        <div>
          <ol>
            { resultsListItems }
          </ol>
        </div>
      </div>
    );
  }
}

export default App;
