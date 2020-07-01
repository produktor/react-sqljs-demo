import React from "react";
import "./styles.css";
import initSqlJs from "sql.js";

class Article {
  internal_article_id;
  ean_code;
  company_id;
  brand;
  user_group;
  article_type;
  line;
  frame_dbl;
  frame_rim_type;
  frame_rx;
  frame_colour;
  frame_material;
  frame_material_type;
  frame_height;
  frame_width;
  frame_spring_hinge;
  frame_temple_length;
  frame_shape_type;
  frame_shape_height;
  frame_shape_length;
  lens_material_type;
  lens_colour;
  image_medium_url;
  delivery_range_index;
}

export default class App extends React.Component {

  /** {Article[]} */
  articles;


  constructor(props) {
    super(props);
    this.query = React.createRef();
    this.state = { db: null, err: null, articles: null }
  }

  componentDidMount() {
    // sql.js needs to fetch its wasm file, so we cannot immediately instantiate the database
    // without any configuration, initSqlJs will fetch the wasm files directly from the same path as the js
    // see ../config-overrides.js

    const me = this;
    Promise.all([initSqlJs(), fetch('articles.sqlite')]).then(async res => {
      const SQLite = res[0], dbStorage = res[1];
      const db = new SQLite.Database(new Uint8Array(await dbStorage.arrayBuffer()));

      me.setState({db: db});

      // document.getElementById("App")
      const sql = me.query.current.value;
      me.search(sql);

    }).catch(err => {
      me.setState({err});
    });

  }

  search(query) {
    let results = null, err = null, articles =null;
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
                + "LIMIT 200;  "

    try {
      // The sql is executed synchronously on the UI thread. 
      // You may want to use a web worker
      results = this.state.db.exec(sql); // an array of objects is returned
      const columns = results[0].columns;
      articles = results[0].values.map(row => {
        let article = new Article();
        columns.map( (columnName, i) => {
          article[columnName] = row[i];
        })
        return article;
      })

    } catch (e) {
      // exec throws an error when the SQL statement is invalid
      err = e
    }
    this.setState({  err, articles })
  }

  /**
   * Renders a single value of the array returned by db.exec(...) as a table
   * @param {Article} article
   */
  renderArticle(article) {
    return (<div>
        <h1>{article.brand}</h1>
      </div>);
  }

  render() {
    let { db, err, articles } = this.state;
    if (!db) return <pre>Loading...</pre>;
    return (
      <div className="App">

        <h1>Search eyewear</h1>

        <textarea
          onChange={e => this.search(e.target.value)}
          defaultValue="Damen"
          ref={this.query}
        />

        <pre className="error">{(err || "").toString()}</pre>

        <pre>{articles
          ? articles.map(article => {
            return (
              <div  style={{float:'left', height: 200, width: 200 }}>{article.name}
                <img width={200} src={article.image_medium_url} alt={article.internal_article_id}/>
              </div>
            )
          })
          : ""
        }</pre>

      </div>
    );
  }

}
