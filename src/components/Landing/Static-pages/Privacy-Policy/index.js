import React, { Component, PropTypes} from 'react';
import Header from '../Header';
import { browserHistory } from 'react-router';

export default class PrivacyPolicy extends Component {

  componentDidMount = ()=>{
    if(typeof window !== "undefined") {
      window.fbq('trackCustom', 'PrivacyPolicyPageView');
    }
  };

  goBackHandler = ()=>{
    browserHistory.goBack();
  }

  render(){
    return(
      <div className='static-pages'>
        <Header title='PRIVACY POLICY' onClick={this.goBackHandler}  />
        <section className='static-content'>
          <div className='container'>
            <div className='row'>
              <p>
                This Privacy Policy shall be read in conjunction and together with the Terms of Use available on <a href='/terms-of-use'>www.voot.com</a> and forms an integral part of the user agreement between You and the Company. Capitalized terms not defined herein shall have the meaning attributed to them under the Terms of Use.
              </p>
              <p>By accessing and/or using the Service, You signify Your agreement to accept this Privacy Policy. <u>IF YOU DO NOT AGREE WITH ANY OR ALL OF THE FOLLOWING TERMS OF THE PRIVACY POLICY, PLEASE DO NOT ACCESS AND/OR USE THE SERVICE.</u></p>
              <p>Providing information to Us is Your choice. You understand that any data, information, content or information that You post, submit or upload to the Service shall be visible to other Users of the Service and will be stored on Company’s servers for the purposes of making the Service available to You. We advise You to be selective about what information You post. Please do not post, submit or upload to the Service any data, information, content or information which would include any Personal Information and Sensitive Personal Data or Information that You do not wish to be made available to the Company or to the public at the large. </p>
              <p>If You do not agree with any or all of the terms of this Privacy Policy, please do not provide any information to Us. If at any time You wish to discontinue Your access of the Service, You are free to do so. Further, if You require You can choose to have the Personal Information provided by You deleted by writing to <a href='mailto:support@voot.com'>support@voot.com</a>.</p>
              <p>We reserve the right, at Our sole discretion, to change, modify or otherwise alter this Privacy Policy at any time without prior notice. Such changes and/or modifications shall become effective immediately upon being posted/published on the Service herein. </p>
              <p>Please review the Privacy Policy from time-to-time. Your continued use of the Service following the posting of changes and/or modifications will constitute Your acceptance of any revised Privacy Policy. The Company retains the right at any time to deny or suspend access to all or part of the Service to anyone who the Company believes has violated any condition of this Privacy Policy.</p>
              <p>The terms "Personal Information" and "Sensitive Personal Data or Information" shall have the meaning ascribed to it under the applicable laws of India. </p>

              <h4>SENSITIVE PERSONAL DATA OR INFORMATION</h4>
              <p>THE COMPANY WILL NEVER ASK YOU AND YOU MUST NEVER PROVIDE SENSITIVE PERSONAL DATA OR INFORMATION TO THE COMPANY OR TO ANY PERSON/ENTITY REPRESENTING THE COMPANY. ANY DISCLOSURE OF SENSITIVE PERSONAL DATA OR INFORMATION SHALL BE AT YOUR SOLE RISK AND WITHOUT ANY LIABILITY TO THE COMPANY (INCLUDING ITS DIRECTORS, KEY MANAGERIAL PERSONNEL, OFFICERS AND EMPLOYEES). YOU UNDERSTAND, ACKNOWELGE AND AGREE THAT THE COMPANY OR ANY OTHER PERSON ACTING ON BEHALF OF THE COMPANY SHALL NOT IN ANY MANNER BE RESPONSIBLE FOR THE AUTHENTICITY OF THE PERSONAL INFORMATION OR SENSITIVE PERSONAL DATA OR INFORMATION PROVIDED BY YOU TO THE COMPANY. </p>
              <p>YOU MUST NOT DISCLOSE YOUR:</p>
              <ul>
                <li>
                  <ol>
                    <li>passwords; </li>
                    <li>financial information such as bank account details, credit card details, debit card details, secure pin number, passwords, etc.;
                    </li>
                    <li>physical, physiological and mental health condition;  </li>
                    <li>sexual orientation; </li>
                    <li>medical records and history; </li>
                    <li>biometric information;</li>
                    <li>national identification numbers;</li>
                    <li>and such other sensitive personal data or information.</li>
                  </ol>
                </li>
              </ul>
              <ol>
                <li>
                  Users must note that any information that is freely available or accessible in public domain or furnished under the Right to Information Act, 2005 or any other law for the time being in force shall not be regarded as Personal Information or Sensitive Personal Data or Information for the purposes of this Privacy Policy and the Company shall not be obliged to take any measures to protect the same since the same is freely available in the public domain.
                </li>
                <li>
                  Please note that identity theft and the practice currently known as "phishing" are of great concern to the Company. We do not and will not, at any time, request Your credit card information/debit card information/financial pin numbers and passwords.
                </li>
              </ol>
              <h4>PERSONAL INFORMATION</h4>
              <ol>
                <li>The primary purpose of collection of Personal Information set out in Clause 1 (I) hereinbelow and other information set out in Clause 1 (I) to (VIII) hereinbelow, is to allow You to access and use the Service and various features on or in relation to the Service provided by the Company.
                  <ol>
                    <li>
                      We may obtain information about Your name, email address, date of birth, age, device, device id, contact details, gender, location, pin code, area code, occupation, provided by You either on the Service and/or which may be available to the Company or other Users as a result of You publishing User Material on the Service and/or which may be available to the Company if You access the Service through any linked social media platforms;
                    </li>
                    <li>
                      We may also obtain information about You, from any e-mails, letters, communication, etc. that You send to Us.
                    </li>
                    <li>
                      We may receive information that You submit to any Third-Party Service You access from links contained within the Service. You should check the privacy policy of such Third-Party Websites to find out how they will use Your personal information and sensitive personal data or information. The Company shall not be responsible or liable for use or misuse of the same by Third-Party Websites.
                    </li>
                    <li>
                      We may obtain information about Your IP address, operating system, browser type, browser version, browser configuration, name of internet service provider, and other types of computer and connection related information relevant to identifying Your type of device, geographic location, usage history, etc.
                    </li>
                    <li>
                      We may also obtain information about how the Service is used by You. Such information may include but shall not be limited to:
                      <ol>
                        <li>User Material that You publicly post or share on the Service;
                        </li>
                        <li>login information (date and time of login, number of logins, etc.);
                        </li>
                        <li>destinations/ pages visited within the Service;
                        </li>
                        <li>advertisements viewed and measurement of advertisement effectiveness;
                        </li>
                        <li>content viewed;
                        </li>
                        <li>content shared on social media;
                        </li>
                        <li>User preferences (eg. program preferences, language, preferred social media, liked pages, searched items, etc.);

                        </li>
                        <li>Third-Party Websites visited while on the Service;
                        </li>
                        <li>Service requests; etc
                        </li>
                        <li>Device Id/IMEA No:
                        </li>
                        <li>all other individual usage patterns on the Service.
                        </li>
                      </ol>
                    </li>
                    <li>
                      We may also obtain information collected by cookies or similar technologies (as described below), through contest and promotions held by the Company, newsletter subscriptions, enrollment for promotions, campaigns, special offers, surveys, feedback, analytics, research, information posted in social communities on the Service, etc. or otherwise shared on the Service.
                    </li>
                    <li>
                      We may also obtain information collected as a result of You hosting, displaying, uploading, modifying, publishing, transmitting, updating and sharing User Materials in any on the Service.
                    </li>
                    <li>If You access the Service through a social media platform, We may collect Your user ID or user name, any information You have permitted the social media service to share with Us, and any information You have made public with the social media service. In such a case, You undertake to comply to the Terms of Use including the Privacy Policy of the Service and any additional terms and conditions stipulated by such social media platforms. In the event of any inconsistency, the Terms of Use including the Privacy Policy of the Service shall prevail to the extent of conflict.
                    </li>
                  </ol>
                </li>
                <li>
                  We may combine Your personal information with information collected from Tracking Technologies and aggregate it with information collected from other Users using the Service to attempt to provide You with the services and a better experience on the Service. You understand, agree and acknowledge that Our collection, storage and processing of Your personal information is for a lawful purpose connected with the functioning of the Service. You hereby consent to the collection, storage, use, disclosure, transfer, processing of the personal information for the purposes set out herein.
                </li>
                <li>WE MAY DISCLOSE YOUR PERSONAL INFORMATION IN THE CIRCUMSTANCES SET OUT BELOW AND YOU HEREBY CONSENT TO THE SAME TO BE SHARED WITH:
                  <ol>
                    <li>
                      any third-party service provider to whom disclosure is necessary to enable Us to provide You with the services which You wish to access on or through the Service;
                    </li>
                    <li>
                      any third-party service provider to whom disclosure is necessary to enable Us to provide You with the gratification as a result of You participating in any contest, promotional or marketing activity organized by the Company;
                    </li>
                    <li>
                      any person/entity to whom disclosure is necessary in accordance with applicable law;
                    </li>
                    <li>
                      any government or statutory authority or court of law or judicial forum to whom disclosure is necessary in accordance with applicable law;
                    </li>
                    <li>
                      in circumstances We believe necessary or appropriate to respond to valid claims and legal process, to protect the property and rights of the Company, to protect the safety of the public or any person or User, or to prevent or stop any illegal, unethical or legally actionable activity;
                    </li>
                    <li>
                      any person/entity to whom disclosure is necessary to enable Us to enforce Our rights;
                    </li>
                    <li>
                      to Our joint ventures, business partners, agents or third parties for the purposes of the services or for any other marketing and promotional activity undertaken by or on behalf of the Company;
                    </li>
                    <li>
                      any entity that legally acquires the Company or its Service.
                    </li>
                  </ol>
                  We will use reasonable efforts to ensure that third parties who provide services in terms of this Clause 3, are under an obligation to maintain confidentiality with respect to the personal information and to use it for the purposes of the services only.<br />
                  <br />
                  We understand the importance of data security and We want Your browsing experience with Us to be as safe as possible. We have implemented reasonable safeguards and precautions to protect Your personal information.
                  <br /><br />
                  PLEASE UNDERSTAND THAT, WHILE WE STRIVE TO PROTECT YOUR PERSONAL DATA AGAINST POTENTIAL RISKS AND EXPOSURES, THERE IS NO ABSOLUTE SECURITY IN THE ONLINE/ INTERNET SPHERE. THEREFORE, YOU MUST NOT DISCLOSE ANY INFORMATION ON THE SERVICE THAT IS SENSITIVE PERSONAL DATA OR INFORMATION. YOU UNDERSTAND THAT THE TRANSMISSION OF INFORMATION OVER THE INTERNET IS NOT COMPLETELY SECURE AND THERE ARE RISKS ASSOCIATED WITH IT. ALTHOUGH WE STRIVE TO PROTECT YOUR PERSONAL INFORMATION, WE CANNOT GUARANTEE THE SECURITY OF THE SAME WHILE IT IS BEING TRANSMITTED TO OUR SERVICE AND ANY TRANSMISSION IS AT YOUR OWN RISK.
                </li>
              </ol>
              <h4>COOKIES &amp; WEB BEACONS</h4>
              <ol>
                <li>
                  BY DEFAULT, YOUR WEB BROWSER WILL ACCEPT COOKIES, HOWEVER THIS CAN BE ALTERED BY YOU. YOU HAVE THE OPTION OF ENABLING OR DISABLING COOKIES IN YOUR WEB BROWSER. IF YOU DO NOT WANT US TO INSTALL COOKIES, YOU MAY CHANGE THE SETTINGS ON YOUR WEB BROWSER TO DISABLE COOKIES. HOWEVER PLEASE NOTE THAT IF YOU DISABLE COOKIES, YOU MAY NOT BE ABLE TO USE ALL OF THE FEATURES OF THE SERVICE.
                </li>
                <li>
                  The Service and/or third parties may use "<b>Cookies</b>", "<b>Web Beacons</b>", and other similar tracking technologies (collectively, "<b>Tracking Technologies</b>") to collect information automatically as You browse the Service and the internet. For the purposes of this clause below terms have the meanings as set out below:
                  <br /><br />
                  "<b>Cookies</b>" (which may be html files, flash files or other technology) are text files that help store user preferences and activity.
                  <br /><br />
                  "<b>Web beacons</b>" (also known as image tags, gif or web bugs) are small codes used to collect advertising data, such as counting page views, promotion views or advertising responses.
                </li>
                <li>We use Tracking Technologies to help tailor Our content, understand Service and internet usage, improve or customize the content, offerings or advertisements on this Service, personalize Your experience on this Service (for example, to recognize You by name when You return to the Service), save Your password in password-protected areas, save Your online game or video player settings, allow Users to move between associated Services without logging into each Service, help us offer You programs or services that may be of interest to You, deliver relevant advertising, maintain and administer the Service, etc. These Tracking Technologies collect "click stream" data and other additional information regarding Your visits to the Service, such as Your visits to the Service's webpages, use of Our features, or preferences and may also collect Your IP address or some other identifier unique to the device You use to access the Service ("Identifier"). Your Identifier is automatically assigned to the device You use to access the Service. By visiting the Service, whether as a registered user or otherwise, You acknowledge, understand and hereby agree that You are giving us Your consent to track Your activities and Your use of the Service through these Tracking Technologies.
                </li>
                <li>The Service may additionally use a variety of third party advertising networks, data exchanges, traffic measurement service providers, marketing analytics service providers and other third parties including Sokrati, Google and others (collectively, "<b>Third Party Advertising Service Providers</b>") to, for example, serve advertisements on the Service, facilitate targeting of advertisements and/or measure and analyze advertising effectiveness and/or traffic on the Service ("<b>Targeting Services</b>"). These Third Party Advertising Service Providers may enable us to display advertisements based on Your visits to the Service and other Services You have visited. Targeting Services enable Us to, among other things, help deliver advertisements or other content to You for services that You might be interested in, to conduct research regarding the usefulness of certain advertisements to You, etc.
                </li>
                <li>The Third Party Advertising Service Providers, as well as advertisers, may themselves set and access their own Tracking Technologies on Your device if You choose to have Tracking Technologies enabled in Your browser (or, for flash cookies, if You have not removed them) and/or they may otherwise have access to information about You.
                </li>
                <li>
                  Cookie and IP address information of a request to any Third Party Advertising Service Provider may be transferred to the responding data centers outside the territory of India as well and these may include countries where applicable data protection laws provide a lesser degree of protection than India. By using this Service You consent to the processing of data about You by such Third Party Advertising Service Providers. In the event of any inconsistency, the Terms of Use including the Privacy Policy of the Service shall prevail to the extent of conflict only.
                </li>
              </ol>
              <h4>THIRD-PARTY WEBSITES</h4>
              <ol>
                <li>
                  This Service may contain links to other Services owned and operated by third parties which are not under the control of the Company ("<b>THIRD-PARTY WEBSITES</b>").
                </li>
                <li>
                  THE SERVICE MAY CONTAIN LINKS TO OTHER THIRD-PARTY WEBSITES WHICH ARE NOT UNDER THE CONTROL OF THE COMPANY. ANY SERVICE YOU VISIT BY A LINK FROM THE SERVICE IS SOLELY THE RESPONSIBILITY OF THE THIRD PARTY PROVIDING THE SERVICE. THE CONTENT OF, INCLUDING MATERIALS AND INFORMATION CONTAINED ON, ANY THIRD PARTY SERVICE TO WHICH YOU LINK FROM THE SERVICE IS SOLELY THE RESPONSIBILITY OF THE PROVIDER OF THAT THIRD PARTY SERVICE. ANY TRANSACTIONS THAT YOU ENTER INTO WITH A THIRD PARTY LISTED IN THIS SERVICE OR LINKED FROM THIS SERVICE ARE SOLELY BETWEEN YOU AND THAT THIRD PARTY. THE COMPANY IS NOT RESPONSIBLE FOR ANY SUCH THIRD-PARTY SERVICE, ANY PRODUCTS OR SERVICES SOLD OR PROVIDED BY SUCH THIRD PARTY SERVICES, NOR THE ORGANIZATIONS PUBLISHING THOSE THIRD PARTY SERVICES, AND HEREBY DISCLAIM ANY RESPONSIBILITY AND LIABILITY FOR THE SAME. THE INCLUSION OF ANY LINKS DOES NOT CONSTITUTE OR IMPLY AN ENDORSEMENT OR RECOMMENDATION BY US OF THE THIRD-PARTY, OF THE QUALITY OF ANY PRODUCT OR SERVICE, ADVICE, INFORMATION OR OTHER MATERIALS DISPLAYED, PURCHASED, OR OBTAINED BY YOU AS A RESULT OF AN ADVERTISEMENT OR ANY OTHER INFORMATION OR OFFER IN OR IN CONNECTION WITH THE THIRD PARTY SERVICE. THE COMPANY AND SERVICE SHALL NOT BE LIABLE, ACCOUNTABLE OR RESPONSIBLE FOR YOUR PERSONAL INFORMATION AND/OR SENSITIVE PERSONAL DATA OR INFORMATION BEING USED OR MISUSED BY SUCH THIRD-PARTY SERVICE.
                </li>
                <li>
                  YOUR ACCESS AND USAGE OF ANY THIRD-PARTY WEBSITES IS ENTIRELY AT YOUR OWN RISK. THE COMPANY SHALL NOT BE A PARTY TO ANY TRANSACTION BETWEEN YOU AND A THIRD-PARTY SERVICE.
                </li>
                <li>Your use of a Third-Party Service is subject to the terms and conditions and privacy policy of that site in addition to these Terms of Use. In the event of any inconsistency between the governing terms and conditions, the Terms of Use including the Privacy Policy of the Service shall prevail to the extent of conflict.
                </li>
              </ol>
              <h4>SUPPORT</h4>
              <ol>
                <li>
                  If You do not consent to any part of the privacy terms herein or wish to withdraw consent to process Your information then You may stop using the Service and ask Us to remove the Your information from Our records by writing to us at <a href='mailto:support@voot.com'>support@voot.com</a>. However if You so withdraw, We might be unable to provide certain services.
                </li>
                <li>
                  You may also request to know or edit information about yourself stored with Us by writing to Us at <a href='mailto:support@voot.com'>support@voot.com</a>.
                </li>
                <li>
                  In case You have any grievance with respect to the Service, You can send Us an email notification to Our grievance officer at <a href='mailto:support@voot.com'>support@voot.com</a>.
                </li>
                <li>
                  You have full control regarding which emails You want to receive. If You decide at any time that You no longer wish to receive such emails from Us, please write to Us instructing an Opt-Out. Please note that once We receive Your request, it may take an additional period of time for Your opt-out to become effective.
                </li>
                <li>
                  If You have any further questions, queries with respect to the Service, then such correspondence should be directed to the grievance officer at <a href='mailto:support@voot.com'>support@voot.com</a>.
                </li>
              </ol>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

