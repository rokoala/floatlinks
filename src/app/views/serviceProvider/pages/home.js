import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Calendar from 'react-calendar';
import { serviceProviderOperations } from '../../../state/ducks/serviceProvider';

import axios from 'axios';

class Home extends PureComponent {
  componentDidMount() {
    axios.get('http://localhost:3001/serviceprovider').then(response => {
      this.props.setServiceProvider(response.data[0]);
    });
  }
  render() {
    return (
      <div style={{ margin: 15 }}>
        <Calendar />
      </div>
    );
  }
}

const mapDispatchToProps = {
  setServiceProvider: serviceProviderOperations.setServiceProvider
};

export default connect(
  null,
  mapDispatchToProps
)(Home);