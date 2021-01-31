import { Element } from '@craftjs/core';

export default function BodyWrapper({background, children, padding = 50}) {
  return (
    	<Element id="BodyWrapper" canvas style={{height: '500px'}}>
      	{children}
      </Element>
  )
}