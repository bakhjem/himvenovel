import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import { Input, Space } from 'antd';
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
const { Search } = Input;
const LayoutWrapper = ({ children }) => {
  const onSearch = value => console.log(value);

  return (
    <SectionContainer>
      <div className="dark-mode">
        <header id='header' className="header skiptranslate">
          <div className='top-bar'>
            <div className='container'>
              <div className='d-flex align-items-center'>
                <Link href={'/'}>
                  <a className='navbar-item logo'>
                    <div className='hub'>
                      <strong>WNPUB</strong>
                    </div>
                  </a></Link>
                <Search id='search' placeholder="Search..." onSearch={onSearch} />
              </div>
            </div>
          </div>
          <div className='bottom-bar'>
            <div className='container'>
              <ul className='header__links-list'>
                {headerNavLinks.map((link) => (
                  <li className='header__links-item'>
                    <Link
                      key={link.title}
                      href={link.href}
                      // className="p-1 font-medium text-gray-900 sm:p-4 dark:text-gray-100"
                    >
                      <a>
                      {link.title}
                      </a>
                      
                    </Link>
                  </li>

                ))}
              </ul>

            </div>
          </div>
          {/* <div className="flex items-center text-base leading-5">
            <div className="hidden sm:block">
              {headerNavLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="p-1 font-medium text-gray-900 sm:p-4 dark:text-gray-100"
                >
                  {link.title}
                </Link>
              ))}
            </div>
            <ThemeSwitch />
            <MobileNav />
          </div> */}
        </header>
        <div className="layout">
        <main className="mb-auto">{children}</main>
       
        <Footer />
        </div>
       
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper
