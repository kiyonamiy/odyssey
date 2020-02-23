import { createGlobalStyle } from 'styled-components';

const IconfontGlobalStyle = createGlobalStyle`
@font-face {
  font-family: "iconfont";
  src: url('./iconfont.eot?t=1576218506619'); /* IE9 */
  src: url('./iconfont.eot?t=1576218506619#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAKcAAsAAAAABoQAAAJQAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCCcAqBEIEcATYCJAMICwYABCAFhG0HMBvCBREFdMk+EmPn0ZYqkFwJRRjNUDXexEP8XPkmf3YvVwKWhGjE2palq2RJoIA0cO7/1Az7QgeUhXmeaLdm3l/Zl+uiUo0rUK7WClifuHf6/6/Ou0DmO69c5pg0qQswDijAvTCKrEBCzwl46zIeE+hhjFlidbZ5t1qyVgXisjl3Qp2LSSkUa6FdczDFbS11daV6hFvh9+OrBVFTaRXWxu1n15y2/IMPSqfpOOwT4gQcb6FgFpLYXZvbqgiBVfQQThOQMvlB07AOsVerEP46q7EXGIV88IGruFXBCiSNTMIGhpHm0suaeeL7Ye+zj/uevN/z+F0kyYqh3g0x1E8RfrbvyZO69sfN40XCuHxhW8aB15OWzX6nXxLMd/F7UHb3cnXrVgX1ZV4CFava5c8EB579Hou+i7/VPRO8HL65Gi5pOql0UJ/BEf6UvOdQ6krLXqUqry1VJil30NFDDzTY0ABvx5oG31Yp1AbfXKDL6NRT1LocZDJmoaWnRWirocvQw0z58Z4GIr7IbszwJIR+Xqj0cQdFPx8yGT+0DPFHW7/w0cPeGHhhT1PCiFWEFWML9R1MM43ScbKImneozn1FWWXIPiGtJglxEBWLOY5Ic2xZLyphliBpGiCj57DvJ5hpsthwoJnnNAxl3ZuCZhocYRWCKgy1QO0OGI3JSPrjmSh9fgcpZ70KtQzURE8QWZnpQSwQ9SBz3dhr4F5eWV0oCcYkIJHJAGQ0D/V6EzDXz7NQgwX0iMwsFdqjZF9dsL5h+LoT0INlrsKeVbRPGWp6dBw=') format('woff2'),
  url('./iconfont.woff?t=1576218506619') format('woff'),
  url('./iconfont.ttf?t=1576218506619') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
  url('./iconfont.svg?t=1576218506619#iconfont') format('svg'); /* iOS 4.1- */
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-circle:before {
  content: "\e600";
}

`;

export default IconfontGlobalStyle;
