import React from "react";
import "./styles.css";
import initSqlJs from "sql.js";
import {Article} from "./Article";
import {Button} from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";

export default class App extends React.Component {
  query = React.createRef();
  state = {
    db:       null,
    err:      null,
    articles: null
  }

  componentDidMount() {
    const me = this;
    Promise.all([initSqlJs(), fetch('articles.sqlite')]).then(async res => {
      const SQLite = res[0], dbStorage = res[1];
      me.setState({
        db: new SQLite.Database(new Uint8Array(await dbStorage.arrayBuffer()))
      });

      me.search("Herren");

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
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/" onClick={this.handleClick}>
            Optikfried
          </Link>
          <Link color="inherit" href="/getting-started/installation/" onClick={this.handleClick}>
            Eyewears
          </Link>
          <Typography color="textPrimary">Articles</Typography>
        </Breadcrumbs>

        <div style={{height: 10}}/>

        <TextField
          id="filled-basic"
          label="Search"
          variant="filled"
          onChange={e => this.search(e.target.value)}
          defaultValue="Damen"
          ref={this.query}
          fullWidth={100}
        />

        <pre className="error">{(err || "").toString()}</pre>

        <Grid
          container
          justify="center"
          alignItems="center"
          spacing={1}>

          {articles ? articles.map(article => {
            return (<Grid container item xs={2} spacing={3}>
              {article.name}
              <img width={200} src={article.image_medium_url} alt={article.internal_article_id}/>
            </Grid>)
          }) : ""}

        </Grid>

      </div>);
  }

  handleClick() {

  }

}
