import classes from './EditButton.module.css';
import editButton from '../../img/edit.png';
import deleteButton from '../../img/delete.png';


const EditButton = (props)=>{

    return(
        <div className={classes.container}>
            <button onClick={props.onEdit}  className={classes.editButton} ><img src={editButton}/></button>
            <div className={classes.seperator}></div>
            <button onClick={props.onDelete}  className={classes.deleteButton} ><img src={deleteButton}/></button>
        </div>
    )
}

export default EditButton;