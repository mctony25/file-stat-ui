import React, {Component} from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';
import InsertDrive from '@material-ui/icons/InsertDriveFile';
import ListItemText from '@material-ui/core/ListItemText';
import DateFormatter from './DateFormater'
import SizeFormatter from './SizeFormatter'

class FileItem extends Component {


    render() {
        return (
            <div>
                {this.props.file ? (
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                {this.props.file.is_directory ? (<FolderIcon/>) : (<InsertDrive/>)}
                            </Avatar>
                        </ListItemAvatar>

                        <ListItemText primary={this.props.file.name + " (" + SizeFormatter.formatHumanReadable(this.props.file.size, 2) + ")"}
                                      secondary={DateFormatter.format(this.props.file.last_modification)}/>
                    </ListItem>
                ) : null}
            </div>
        )
    }
}

export default FileItem