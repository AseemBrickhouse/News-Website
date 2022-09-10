import React, { Component, useEffect }from 'react';

// export default class Advertisments extends Component{
//     componentDidMount(){
//         const installGoogleAds = () => {
//             const elem = document.createElement("script");
//             elem.src = "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
//             elem.async = true;
//             elem.defer = true;
//             document.body.insertBefore(elem, document.body.firstChild); 
//         };
//         installGoogleAds();
//         (window.adsbygoogle = window.adsbygoogle || []).push({});
//     }
//     render(){
//         <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
//         return(
//             <ins className ='adsbygoogle'
//             style={{ display: 'block' }}
//             data-ad-client='ca-pub-12121212'
//             data-ad-slot='12121212'
//             data-ad-format='auto'/>
//         );
//     }
// }
const Advertisments = () => {
    useEffect(() => {
        const pushAd = () => {
          try {
            const adsbygoogle = window.adsbygoogle
            console.log({ adsbygoogle })
            adsbygoogle.push({})
          } catch (e) {
            console.error(e)
          }
        }
    
        let interval = setInterval(() => {
          // Check if Adsense script is loaded every 300ms
          if (window.adsbygoogle) {
            pushAd()
            // clear the interval once the ad is pushed so that function isn't called indefinitely
            clearInterval(interval)
          }
        }, 300)
    
        return () => {
          clearInterval(interval)
        }
      }, [])
      return (
        <ins
          className="adsbygoogle"
          style={{ display: "inline-block", width: "300px", height: "250px" }}
          data-ad-client="ca-pub-xxxxxx"
          data-ad-slot="xxxxx"
        ></ins>
      )
}
export default Advertisments;