import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

export default function Footer() {
  return (
    <div id="footer">
      <div className="container skiptranslate">
        <div className="content">
          <div className="main row no-gutters">
            <div className="col-sm-12 col-md-4">
              <div className="row">
                <div className="links col-md-4 col-sm-12">
                  <div className="heading">Help</div>
                  <ul>
                    <li><a>Contact</a></li>
                    <li><a>Privacy Policy</a></li>
                    <li><a>Terms of Use</a></li>
                    <li><a>DMCA</a></li>
                  </ul>
                </div>
                <div className="links col-md-4 col-sm-12">
                  <div className="heading">Links</div>
                  <ul>
                    <li><a>Newest</a></li>
                    <li><a>Recently Updated</a></li>
                    <li><a>Popular</a></li>
                  </ul>
                </div>
                <div className="col-md-4 mainc">
                  <p className="mt-4">Copyright ©Himenovel</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
