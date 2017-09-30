import React, { Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import ProfileHeader from './ProfileHeader';
import DataSection from './DataSection';
import LanguageSection from './LanguageSection';
import ChangePasswordSection from './ChangePasswordSection';
import ChangePassword from '../../../Authentication/ResetPassword/ChangePassword/ChangePassword';
import Modal from 'react-modal';
import customStyles from '../../../../general/modalCustomStyle';
import dataUsage from './dataUsage';
import {formDataGenerator} from '../../../../util/formDataGenerator';
import {bindActionCreators} from 'redux';
import { changeProfile, getProfile } from '../../../../actions/userAction';
import endpoints from '../../../../endpoints/user';
import playlistendpoints from '../../../../endpoints/playList';
import {setLoader} from '../../../../actions/loader';
import Loader from '../../../Loader';
import languages from './languages';
import {getFollowList} from '../../../../actions/getMediaInfo';
import {createRouteString} from '../../../../util/routeCreater';
import Header from './Header';
import FollowListItem from './FollowList';

class MyVoot extends Component{
  constructor(props){
    super(props);
    this.state = {
      loadOnce : false,
      openChangePasswordModal:false,
      languages:languages,
      userData:this.props.user,
      dataUsage:dataUsage,
      firstNameEditable:false,
      lastNameEditable:false,
      isSubmit:false,
    };
  }
  componentWillMount(){
    const { data,isLogin } = this.props;
    //if(data.ID && data.Languages && isLogin && data.Uid){
    if(data.ID && isLogin && data.Uid){
      this.initialize(data);
    }
    else{
      this.context.router.push('/');
    }
  }

  componentDidMount = ()=>{
    if(typeof window !== "undefined") {
      window.fbq('trackCustom', 'VootPageView');
    }
  };

  componentWillReceiveProps(nextProps){
    this.setState({userData:nextProps.user});
    if(nextProps.data.ID && !this.state.loadOnce){
      const { data,isLogin } = nextProps;
      //if(data.ID && data.Languages && isLogin && data.Uid){
      if(data.ID && isLogin && data.Uid){
        this.initialize(data);
      }
    }
    if(nextProps.user.data.ID){
      const { user } = nextProps;
      const { Languages } = user.data;
      if( Languages && Languages.length){
        let { languages } = this.state;
        languages = languages.map((language)=>{
          for(let i = 0; i < Languages.length; i++) {
            if(Languages[i].Name === language.label){
              language.isReq = 1;
            }
          }
          return language;
        });
        this.setState({languages});
      }
    }
  }

  componentWillUnmount=()=>{
    const { isSubmit } = this.state;
    const { data, user } = this.props;
    const { Languages } = data;
    if(!isSubmit){
      if( Languages && Languages.length){
        let { languages } = this.state;
        languages = languages.map((language)=>{
          for(let i = 0; i < Languages.length; i++) {
            if(Languages[i].Name === language.label){
              language.isReq = 1;
            }
            else{
              language.isReq = 0;
            }
          }
          return language;
        });
        this.setState({languages});
      }
    }
  };

  initialize(data) {
    this.setState({loadOnce:true});
    const {ID, Languages} = data;
    const formData = [
      {
        'key': 'user_id',
        'value': ID,
      },
    ];
    if (Languages && Languages.length) {
      let {languages} = this.state;
      languages = languages.map((language)=> {
        for (let i = 0; i < Languages.length; i++) {
          if (Languages[i].Name === language.label) {
            language.isReq = 1;
          }
        }
        return language;
      });
      this.setState({languages});
    }
    this.props.setLoader(true);
    this.props.getUserProfile(endpoints.getProfile, formDataGenerator(formData));


    const {Uid} = data;
    if (Uid) {
      const formData = [
        {
          'key': 'userKey',
          'value': Uid,
        },
      ];
      //this.props.setLoader(true);
      this.props.getFollowList(playlistendpoints.followList, formDataGenerator(formData));
    }

  }

  /*
  * change password modal open handler
  * */
  openChangePasswordModal = ()=>{
    document.getElementsByTagName('body')[0].className = 'body-static';
    this.setState({openChangePasswordModal: true});
  };

  routeTo = (response)=>{
    this.context.router.push(`/shows/${createRouteString(response.seriesMainTitle)}/${response.season}/${response.tvSeriesId}`);
  };
  getSbuValue=(item, sbuList)=>{
    const SBU= sbuList;
    if(SBU && item){
      for (let i in SBU) {
        if (i==item.toUpperCase()) {
          let sbu=SBU[i];
          return sbu;
        }
      }
    }
  };
  renderFollowList = ()=>{
    let list = this.props.getMediaInfo.followList.data.assets;
    let followList;
    if(list){
      followList = list.map((response, index) => {
        let item = {
          sbu: this.getSbuValue(response.SBU,this.props.SBU_LIST),
          genre: response.genre,
          episodeNo:response.totalMedias,
          imgURLL: response.Pictures[1].URL,
          imgURLM: response.Pictures[2].URL,
          imgURLS: response.Pictures[4].URL,
          mediaMainTitle: response.seriesMainTitle,
          contentType: response.contentType,
          totalEpisodes: response.totalMedias,
          totalEpisodesToWatch: response.totalEpisodesToWatch,
          totalShortsToWatch: response.totalShortsToWatch,
        };
        return <FollowListItem key={index} aspectRatio='16x9' item={item} isTitleMultiLine={false} onClick={()=>this.routeTo(response)}/>;
      });
      return followList;
    }
  };
  /*
  * change passworrd modal close handler
  * */
  closeChangePasswordModal= ()=> {
    document.getElementsByTagName('body')[0].className = '';
    this.setState({openChangePasswordModal: false});
  };
  /*
  * hanlder for selecting multiple lagnuages
  * */
  onLanguageSelect = (selectedLanguage) => {
    let { languages } = this.state;
    languages = languages.map(( language ) => {
      if(selectedLanguage.name === 'Hindi' || selectedLanguage.name ==='English'){
        return language;
      }
      if(language.name === selectedLanguage.name){
         language.isReq = language.isReq === 0 ? 1:0;
        return language;
      }
      return language;
    });
    this.setState({ languages });
  };

  /*
  * handler for selecting data usages
  * */
  onDataUsageSelect = (selectedUsage)=> {
    let { dataUsage } = this.state;
    dataUsage = dataUsage.map((datausage)=>{
      if(selectedUsage.value === datausage.value){
        datausage.isSelected = true;
        return datausage;
      }
      else{
        datausage.isSelected = false;
        return datausage;
      }
    });
    this.setState({dataUsage});
  };

  /*
  * nameChangeHandle
  * */
  onNameChange=(value, key)=>{
    let { userData } = this.state;
    userData.data[key] = value;
    this.setState({userData});
  };
  toggleEdit= (name, value) => {
    if(value.length > 0){
      this.setState({[name]:!this.state[name]});
    }
  };

  submitUserDetail = ()=>{
    const { userData: { data }, languages } = this.state;
    const userEmail =  data.Email.filter((email)=>{
      return email.Type ==="Primary";
    });
    const firstname = data.FirstName;
    const lastname = data.LastName;
    const user_id = data.ID;
    const ImageUrl = data.ImageUrl;
    const email = userEmail[0].value;
    const Languages = languages.filter((language) => {
      if(language.isReq)
        return language;
    }).map(language => language.label);
    const formData = [
      {
        'key': 'user_id',
        'value':user_id,
      },
      {
        'key':'firstname',
        'value':firstname,
      },
      {
        'key':'lastname',
        'value':lastname,
      },
      {
        'key': 'Languages',
        'value': Languages,
      },
      {
        'key': 'ImageUrl',
        'value': ImageUrl,
      },
    ];
    this.props.setLoader(true);
    this.props.changeProfile(endpoints.changeProfile, formDataGenerator(formData));
  }
  render(){
    const { profileChanged, user, openSignInModal, closeModal, loginFromSocial, data, SBU_LIST } = this.props;
    let className,backgroundColor;
    if(data.Provider === 'facebook'){
       className = 'icon-fb';
       backgroundColor = '#3C5A98';
    }
    if(data.Provider === 'google'){
       className = 'icon-google';
       backgroundColor = '#EA4335';
    }
    let submitButtonStyle = {
      textAlign: 'center',
    };
    return(
      <div className='my-voot'><Loader {...this.props} />
        <div>
          {
            user.data.ID
              ?
              <div className='content-container'>
                <ProfileHeader
                  data={this.state.userData}
                  onNameChange={this.onNameChange}
                  toggleEdit={this.toggleEdit}
                  firstNameEditable={this.state.firstNameEditable}
                  lastNameEditable={this.state.lastNameEditable}
                  profileChanged={profileChanged}
                  loginFromSocial={loginFromSocial}
                />
                <DataSection dataUsage={this.state.dataUsage} onSelect={this.onDataUsageSelect} />
                <LanguageSection languages={this.state.languages} onSelect={this.onLanguageSelect} />
                <div style={submitButtonStyle}><input type='button' onClick={this.submitUserDetail} value='Submit' className='submit-button' /></div>
                {
                  loginFromSocial
                    ?
                    true
                    :
                    <ChangePasswordSection
                      openChangePasswordModal={this.openChangePasswordModal}
                      closeChangePasswordModal={this.closeChangePasswordModal}
                    />
                }
              </div>
              : null
          }
          {
            <div>
              {this.props.data.ID && this.props.getMediaInfo.followList.load && <Header list={this.props.getMediaInfo.followList.data.assets} />}
              {this.renderFollowList()}
            </div>
          }
        </div>
        <Modal
          ref='changePassword'
          isOpen={this.state.openChangePasswordModal}
          style={customStyles}
          contentLabel='Modal'
        >
          <ChangePassword
            closeChangePasswordModal={this.closeChangePasswordModal}
            openSignInModal={openSignInModal}
            closeModal={closeModal}
          />
        </Modal>
      </div>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    SBU_LIST: state.config && state.config.config && state.config.config.assets && state.config.config.assets.SBU_LIST ?  state.config.config.assets.SBU_LIST:false,
    data: state.authentication.login.data,
    loginFromSocial: state.authentication.login.loginFromSocial,
    isLogin: state.authentication.login.isLogin,
    language: state.language,
    profileChanged: state.authentication.profileChanged,
    user: state.user,
    loader:state.loader,
    getMediaInfo: state.getMediaInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeProfile: bindActionCreators(changeProfile, dispatch),
    getUserProfile:bindActionCreators(getProfile, dispatch),
    setLoader: bindActionCreators(setLoader,dispatch),
    getFollowList: bindActionCreators(getFollowList,dispatch),
  };
};

MyVoot.propTypes = {
  language: PropTypes.object,
  data: PropTypes.object.isRequired,
  loginFromSocial: PropTypes.bool,
  changeProfile: PropTypes.func.isRequired,
  profileChanged: PropTypes.object.isRequired,
  getUserProfile: PropTypes.func.isRequired,
  setLoader: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  openSignInModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  getFollowList: PropTypes.func.isRequired,
  getMediaInfo: PropTypes.object.isRequired,
  isLogin: PropTypes.bool.isRequired,
};

MyVoot.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyVoot);
