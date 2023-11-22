import { Component } from "react";
import { Toast } from "react-bootstrap";


export default class ToastAlert extends Component{
    render(){
        const { displayToast1, displayToast2, handleDelete, closeToast, deleted } = this.props;

        return (
            <>
        {displayToast1 && (
        <Toast variant="danger" animation={false}>
          <Toast.Header>
            <strong className="me-auto">Delete Book Alert</strong>
          </Toast.Header>
          <Toast.Body>Looks like you want to delete this book from the database! If you would like to continue, please hit the delete button below. Otherwise, just close this message and it won't happen.
          <div className="mt-2 pt-2 border-top">
        <button type="button" className="btn btn-warning btn-sm" onClick={handleDelete} id="toastdelete"> Delete Book</button>
        <button type="button" className="btn btn-secondary btn-sm" data-bs-dismiss="toast" onClick={closeToast} > Close Message</button>
             </div>
          </Toast.Body>

        </Toast> ) }

        {displayToast2 && (
        <Toast variant="success" animation={false}>
          <Toast.Header>
            <strong className="me-auto">Book Deleted</strong>
          </Toast.Header>
          <Toast.Body>Book Successfully Deleted : {deleted}
          </Toast.Body>

        </Toast>
        )}
        </>
        )
    }
}