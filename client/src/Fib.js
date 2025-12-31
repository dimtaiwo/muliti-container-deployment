import React, { Component } from 'react';
import axios from 'axios';

class Fib extends Component {
  state = {
    seenIndexes: [],
    values: {},
    index: '',
    error: null
  };

  componentDidMount() {
    this.fetchValues();
    this.fetchIndexes();
  }

  async fetchValues() {
    try {
      const res = await axios.get('/api/values/current');
      this.setState({ values: res.data });
    } catch (err) {
      console.error('Error fetching values:', err);
      this.setState({ error: 'Failed to load calculated values' });
    }
  }

  async fetchIndexes() {
    try {
      const res = await axios.get('/api/values/all');
      this.setState({ seenIndexes: res.data });
    } catch (err) {
      console.error('Error fetching indexes:', err);
      this.setState({ error: 'Failed to load seen indexes' });
    }
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post('/api/values', {
        index: this.state.index
      });
      this.setState({ index: '' });
      this.fetchIndexes();
      this.fetchValues();
    } catch (err) {
      console.error('Submit failed:', err);
      this.setState({ error: 'Failed to submit index' });
    }
  };

  renderSeenIndexes() {
    if (!this.state.seenIndexes.length) {
      return 'None';
    }

    return this.state.seenIndexes
      .map(item => item.number ?? item.index ?? item)
      .join(', ');
  }

  renderValues() {
    const entries = [];

    for (let key in this.state.values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {this.state.values[key]}
        </div>
      );
    }

    return entries.length ? entries : <div>No values yet</div>;
  }

  render() {
    return (
      <div style={{ padding: 20 }}>
        <h2>Fibonacci Calculator</h2>

        {this.state.error && (
          <div style={{ color: 'red', marginBottom: 10 }}>
            {this.state.error}
          </div>
        )}

        <form onSubmit={this.handleSubmit}>
          <label>Enter your index:</label>
          <input
            type="text"
            value={this.state.index}
            onChange={e => this.setState({ index: e.target.value })}
            style={{ marginLeft: 10 }}
          />
          <button type="submit" style={{ marginLeft: 10 }}>
            Submit
          </button>
        </form>

        <h3>Indexes I have seen:</h3>
        <div>{this.renderSeenIndexes()}</div>

        <h3>Calculated Values:</h3>
        <div>{this.renderValues()}</div>
      </div>
    );
  }
}

export default Fib;
