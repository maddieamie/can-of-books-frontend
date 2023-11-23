import React from 'react'; 
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

//

export default class DeleteConfirm extends React.Component {
    submit = () => {
    confirmAlert ({
        
      title: 'Delete Book Confirmation',
      message: 'Are you sure you would like to delete this book?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            this.props.handleDelete();
            
          }
          
        },
        {
          label: 'No',
          
        }
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
    });
}

 render() {
    return (
      <div className='container'>
        <button onClick={this.submit}>Click me to continue deleting book!</button>
      </div>
    );
    }
}