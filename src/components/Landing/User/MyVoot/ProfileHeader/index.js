import React, {Component, PropTypes} from 'react';
import {isRequired} from '../../../../../util/validations';
const ProfileHeader = (props) => {
  const {
    data:{data},
    firstNameEditable,
    lastNameEditable,
    toggleEdit,
    onNameChange,
    profileChanged,
    loginFromSocial,
  } = props;
  const email = data.Email.filter((email) => {
    return email.Type === "Primary";
  });
  let imageUrl ='' ;
  if(data.ImageUrl){
    imageUrl = data.ImageUrl.replace('http:', 'https:');
  }
  if (data.ImageUrl == null || data.ImageUrl === undefined || data.ImageUrl === 'null') {
    imageUrl = 'https://dimg.voot.com/include/user-images/blank-user.jpg';
  }
  let className, backgroundColor;
  if (data.Provider === 'facebook') {
    className = 'icon-fb';
    backgroundColor = '#3C5A98';
  }
  if (data.Provider === 'google') {
    className = 'icon-google';
    backgroundColor = '#EA4335';
  }
  return (
    <div className='user-profile'>
      <img className='background-image' src={imageUrl} alt='image' name='' height='230px' width='100%' />
      <div className='fixed-content'>
        <div className='user-image'>
          <img src={imageUrl} alt='' name='' height='80' width='80' />
        </div>
        {
          loginFromSocial ? <div className='social-btn'>
            <button style={{backgroundColor: backgroundColor}}>
              <i className={className}></i>
            </button>
            <span>{`SIGNED IN VIA ${data.Provider.toUpperCase()}`}</span>
          </div> : null
        }
        <div className='first-name'>
          {
            firstNameEditable && !loginFromSocial
              ?
              <div>
                <input
                  type='text'
                  value={data.FirstName}
                  onChange={(e) => onNameChange(e.target.value, 'FirstName')}
                  onBlur={() => toggleEdit('firstNameEditable', data.FirstName)}
                  maxLength='20'
                  required
                />
                <i className='icon-edit' />
                <span className='form-group text-danger'>
                  {!isRequired(data.FirstName) && 'First name can not be empty.'}
                </span>
              </div>
              :
              <span onClick={() => toggleEdit('firstNameEditable', data.FirstName)}>{`${data.FirstName}`}</span>
          }
        </div>
        <div className='last-name'>
          {
            lastNameEditable && !loginFromSocial
              ?
              <div>
                <input
                  type='text'
                  value={data.LastName}
                  onChange={(e) => onNameChange(e.target.value, 'LastName')}
                  onBlur={() => toggleEdit('lastNameEditable', data.LastName)}
                  maxLength='20'
                />
                <i className='icon-edit' />
                <span className='form-group text-danger'>
                  {!isRequired(data.LastName) && 'Last name can not be empty.'}
                </span>
              </div>
              :
              <span onClick={() => toggleEdit('lastNameEditable', data.LastName)}>{`${data.LastName}`}</span>
          }
        </div>
        <div className='email'>
          <input type='email' name='email' value={`${email[0].Value}`} disabled='disabled' className='emailText' />
        </div>
        {profileChanged.error
          ?
          <p id='errorMessage' className='form-group text-danger txt-center'>{profileChanged.error.description}</p>
          :
          ''
        }
      </div>
    </div>
  );
};

ProfileHeader.propTypes = {
  data: PropTypes.object.isRequired,
  firstNameEditable: PropTypes.bool.isRequired,
  lastNameEditable: PropTypes.bool.isRequired,
  toggleEdit: PropTypes.func.isRequired,
  onNameChange: PropTypes.func.isRequired,
  profileChanged: PropTypes.object.isRequired,
  loginFromSocial: PropTypes.bool.isRequired,
};

export default ProfileHeader;
