import React, {Component} from "react";
import ListUi from '@material-ui/core/List';
import FileItem from '../components/FileItem'
import ListItem from "@material-ui/core/ListItem";
import TextField from "@material-ui/core/TextField";
import ListItemText from "@material-ui/core/ListItemText";
import SizeFormatter from "./SizeFormatter";
import config from 'react-global-configuration'

const util = require('util');

class List extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fileList: [],
            stats: {total_elements: 0, total_files: 0, total_size: 0},
            searchString: "",
            hasError: false,
            errors: {},
        }
        this.defaultFolder = "/tmp/"
        this.onSearchInputChange = this.onSearchInputChange.bind(this);
        this.getFiles()
    }

    getFiles = () => {

        let searchValue = this.state.searchString !== "" ? this.state.searchString : this.defaultFolder
        fetch(util.format("http://%s:%s/files?dirPath=%s", config.get('api_host'), config.get('api_port'), searchValue))
            .then(response => {

                const data = response.json();
                if (response.ok) {
                    return data;
                }

                throw data

            })
            .then((json) => {
                this.setState({fileList: json.files, stats: json.stats, hasError: false, errors: {}})
            })
            .catch((error) => {
                this.setState({
                    fileList: [],
                    stats: {total_elements: 0, total_files: 0, total_size: 0},
                    hasError: true,
                    errors: error
                })
            })
    }

    onchangeValue = (event) => {
        this.setState({searchString: event.target.value});
    }

    onSearchInputChange = (event) => {
        event.preventDefault();

        this.getFiles()
    }

    render() {
        return (
            <div className="wrapper">
                <div>

                    <form onSubmit={this.onSearchInputChange}>
                        <TextField style={{padding: 25}}
                                   id="searchInput"
                                   placeholder="Search for directory"
                                   margin="normal"
                                   onChange={this.onchangeValue}
                                   defaultValue={this.defaultFolder}
                        />
                        <input type="submit" value="Search"/>
                    </form>

                    {
                        this.state.fileList && this.state.hasError === false ? (
                            <ListUi>
                                {this.state.fileList.map(currentFile => (
                                    <FileItem file={currentFile}/>
                                ))}
                                <ListItem>
                                    <ListItemText primary={"Total elements: " + this.state.stats.total_elements}/>
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary={"Total size: " + SizeFormatter.formatHumanReadable(this.state.stats.total_size, 2)}/>
                                </ListItem>
                            </ListUi>
                        ) : ""}

                    {this.state.hasError === true ? (
                        <ListUi>
                            <ListItem>
                                <ListItemText primary={"Could not retrieved directory details"}/>
                            </ListItem>
                        </ListUi>
                    ) : ""}
                </div>
            </div>
        )
    }
}

export default List