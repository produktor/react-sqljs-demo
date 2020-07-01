import React from "react";
import "./styles.css";
import initSqlJs from "sql.js";

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { db: null, err: null, results: null }
  }

  componentDidMount() {
    // sql.js needs to fetch its wasm file, so we cannot immediately instantiate the database
    // without any configuration, initSqlJs will fetch the wasm files directly from the same path as the js
    // see ../config-overrides.js

    const me = this;
    Promise.all([initSqlJs(), fetch('articles.sqlite')]).then(async res => {
      const SQLite = res[0], dbStorage = res[1];
      const db = new SQLite.Database(new Uint8Array(await dbStorage.arrayBuffer()));

      setTimeout(() => this.search('Damen'))

      me.setState({db: db});
    }).catch(err => {
      me.setState({err});
    });

  }

  search(query) {
    let results = null, err = null;
    const sql = "SELECT t.* FROM db_articles t " +
                "WHERE internal_article_id LIKE '%"+query+"%' " +
                "OR ean_code LIKE  '%"+query+"%' " +
                // "OR company_id LIKE  '%"+query+"%' " +
                "OR brand LIKE  '%"+query+"%' " +
                "OR user_group LIKE  '%"+query+"%' " +
                "OR article_type LIKE  '%"+query+"%' " +
                "OR line LIKE  '%"+query+"%' " +
                "OR frame_dbl LIKE  '%"+query+"%' " +
                "OR frame_rim_type LIKE  '%"+query+"%' " +
                "OR frame_rx LIKE  '%"+query+"%' " +
                "OR frame_colour LIKE  '%"+query+"%' " +
                "OR frame_material LIKE  '%"+query+"%' " +
                "OR frame_material_type LIKE  '%"+query+"%' " +
                "OR frame_height LIKE  '%"+query+"%' " +
                "OR frame_width LIKE  '%"+query+"%' " +
                "OR frame_spring_hinge LIKE  '%"+query+"%' " +
                "OR frame_temple_length LIKE  '%"+query+"%' " +
                "OR frame_shape_type LIKE  '%"+query+"%' " +
                "OR frame_shape_height LIKE  '%"+query+"%' " +
                "OR frame_shape_length LIKE  '%"+query+"%' " +
                "OR lens_material_type LIKE  '%" + query + "%' "
                + "OR lens_colour LIKE  '%" + query + "%' "
                // + "OR image_medium_url LIKE  '%" + query + "%' "
                // + "OR delivery_range_index LIKE  '%" + query + "%' "
                + "LIMIT 100;  "

    try {
      // The sql is executed synchronously on the UI thread. 
      // You may want to use a web worker
      results = this.state.db.exec(sql); // an array of objects is returned
    } catch (e) {
      // exec throws an error when the SQL statement is invalid
      err = e
    }
    this.setState({ results, err })
  }

  /**
   * Renders a single value of the array returned by db.exec(...) as a table
   */
  renderResult({ columns, values }) {
    return (
      <table>
        <thead>
          <tr>
            {columns.map(columnName =>
              <td>{columnName}</td>
            )}
          </tr>
        </thead>

        <tbody>
          {values.map(row => // values is an array of arrays representing the results of the query
            <tr>
              {row.map(value =>
                <td>{value}</td>
              )}
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let { db, err, results } = this.state;
    if (!db) return <pre>Loading...</pre>;
    return (
      <div className="App">

        <h1>Search eyewear</h1>

        <textarea
          onChange={e => this.search(e.target.value)}
          defaultValue="Damen"
        />

        <pre className="error">{(err || "").toString()}</pre>

        <pre>{results
          ? results.map(this.renderResult) // results contains one object per select statement in the query
          : ""
        }</pre>

      </div>
    );
  }

}
