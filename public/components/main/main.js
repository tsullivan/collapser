import React from 'react';
import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiText,
} from '@elastic/eui';

export class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { httpClient } = this.props;
    httpClient.get('../api/collapser/get_data').then(({ data }) => {
      this.setState({
        time: data.time,
        total: data.total,
        hits: data.hits,
      });
    });
  }

  renderTable(hits) {
    const rows = hits.map(hit => {
      return (
        <tr>
          <td>{hit.name}</td>
          <td>{hit.gender}</td>
          <td>{hit.year}</td>
          <td>{hit.percent}</td>
          <td>{hit.value}</td>
        </tr>
      );
    });
    return <table>{rows}</table>;
  }

  render() {
    return (
      <EuiPage>
        <EuiPageBody>
          <EuiPageContent>
            <EuiPageContentBody>
              <EuiText>
                <h3>You have successfully!</h3>
                {this.state.hits ? this.renderTable(this.state.hits) : null}
                <p>
                  The server time (via API call) is{' '}
                  {this.state.time || 'NO API CALL YET'}
                </p>
              </EuiText>
            </EuiPageContentBody>
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
    );
  }
}
