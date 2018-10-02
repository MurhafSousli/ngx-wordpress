import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { ClarityIcons } from '@clr/icons';
import { ClrShapeCheck } from '@clr/icons/shapes/core-shapes';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.log(err));

const logoLight = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid meet" viewBox="0 0 640 640" width="640" height="640"><defs><path d="M320 11.95L320 11.95L33.28 114.35L77.01 493.44L320 628.05L320 628.05L320 628.05L562.99 493.44L606.72 114.35L320 11.95L320 11.95Z" id="cB4Jr9WDb"></path><path d="M320 80.43L320 80L320 392.11L320 392.11L320 628.05L320 628.05L562.99 493.44L606.72 114.35L320 11.95L320 80.43Z" id="a1FyGgcyzZ"></path><path d="M290.13 431.15L290.13 431.15C274.9 475.05 266.44 499.44 264.75 504.32C266.45 504.75 268.37 505.17 270.08 505.6C270.29 505.6 270.29 505.6 270.29 505.6C286.08 509.65 302.72 512.21 319.79 512.21C328.32 512.21 336.64 511.79 344.75 510.51C355.84 509.23 366.72 506.67 377.39 503.25C377.39 503.25 377.39 503.25 377.39 503.25C379.95 502.4 382.51 501.55 385.28 500.69C382.51 494.72 376.53 481.28 376.11 480.64C372.57 470.95 354.86 422.53 322.99 335.36L290.13 431.15Z" id="j1G5QJjuVx"></path><path d="M127.57 320.21C127.57 326.4 127.79 332.8 128.43 338.99C135.25 410.24 181.33 470.4 244.69 497.28C247.25 498.35 250.03 499.63 252.8 500.48C243.48 474.88 168.9 270.08 159.57 244.48C151.47 244.05 149.97 244.69 144.43 244.48C134.4 267.09 127.57 295.04 127.57 320.21Z" id="a1PFvIRDHY"></path><path d="M479.57 212.48C477.87 210.13 476.16 207.79 474.45 205.23C452.91 176.43 423.47 153.6 389.33 140.37C367.79 131.84 344.32 127.36 320 127.36C259.63 127.36 205.44 155.52 170.24 199.25C163.63 207.36 157.87 215.89 152.75 224.85C167.04 225.07 184.53 225.07 186.67 225.07C204.8 225.07 232.75 222.72 232.75 222.72C242.13 222.08 243.2 235.73 233.81 237.01C233.81 237.01 224.43 238.08 213.97 238.72C218.17 251.22 239.15 313.73 276.91 426.24L314.88 312.53C298.75 268.37 289.79 243.84 288 238.93C278.61 238.51 269.87 237.23 269.87 237.23C260.48 236.8 261.76 222.29 270.93 222.93C270.93 222.93 299.52 225.28 316.59 225.28C334.72 225.28 362.67 222.93 362.67 222.93C372.05 222.29 373.33 235.95 363.73 237.23C363.73 237.23 354.35 238.29 343.89 238.93C348.06 251.34 368.9 313.34 406.4 424.96C416.77 390.27 422.53 371 423.68 367.15C432.43 344.75 436.69 326.19 436.69 311.25C436.69 289.92 429.01 274.99 422.4 263.47C413.65 249.17 405.33 237.01 405.33 222.93C405.33 206.93 417.49 192.21 434.35 192.21C435.2 192.21 435.84 192.21 436.69 192.21C462.93 191.36 471.47 217.6 472.75 235.31C472.75 235.31 472.75 235.73 472.75 235.95C473.17 243.2 472.96 248.53 472.96 254.72C472.96 272.21 469.76 292.05 459.95 316.59C457.32 324.12 444.16 361.81 420.48 429.65C407.04 469.21 399.57 491.18 398.08 495.57C399.79 494.72 401.71 493.87 403.41 493.01C460.37 465.49 501.76 410.88 510.29 346.03C511.57 337.49 512.21 328.75 512.21 320C512.43 291.41 506.03 263.68 494.72 239.15C490.45 229.76 485.33 220.8 479.57 212.48Z" id="beGoFuE9d"></path></defs><g><g><g><use xlink:href="#cB4Jr9WDb" opacity="1" fill="#eaeaea" fill-opacity="1"></use><g><use xlink:href="#cB4Jr9WDb" opacity="1" fill-opacity="0" stroke="#000000" stroke-width="1" stroke-opacity="0"></use></g></g><g><use xlink:href="#a1FyGgcyzZ" opacity="1" fill="#dadada" fill-opacity="1"></use><g><use xlink:href="#a1FyGgcyzZ" opacity="1" fill-opacity="0" stroke="#000000" stroke-width="1" stroke-opacity="0"></use></g></g><g><g><use xlink:href="#j1G5QJjuVx" opacity="1" fill="#002538" fill-opacity="1"></use><g><use xlink:href="#j1G5QJjuVx" opacity="1" fill-opacity="0" stroke="#000000" stroke-width="1" stroke-opacity="0"></use></g></g><g><use xlink:href="#a1PFvIRDHY" opacity="1" fill="#002538" fill-opacity="1"></use><g><use xlink:href="#a1PFvIRDHY" opacity="1" fill-opacity="0" stroke="#000000" stroke-width="1" stroke-opacity="0"></use></g></g><g><use xlink:href="#beGoFuE9d" opacity="1" fill="#002538" fill-opacity="1"></use><g><use xlink:href="#beGoFuE9d" opacity="1" fill-opacity="0" stroke="#000000" stroke-width="1" stroke-opacity="0"></use></g></g></g></g></g></svg>`;
const logoDark = `<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 18.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 300 300" enable-background="new 0 0 300 300" xml:space="preserve">
<polygon fill="#474747" points="150,5.6 150,5.6 150,5.6 15.6,53.6 36.1,231.3 150,294.4 150,294.4 150,294.4 263.9,231.3 
	284.4,53.6 "/>
<polygon fill="#343434" points="150,5.6 150,37.7 150,37.5 150,183.8 150,183.8 150,294.4 150,294.4 263.9,231.3 284.4,53.6 "/>
<g>
	<path fill="#FFFFFF" d="M151.4,157.2L136,202.1H136l-11.9,34.3c0.8,0.2,1.7,0.4,2.5,0.6c0.1,0,0.1,0,0.1,0
		c7.4,1.9,15.2,3.1,23.2,3.1c4,0,7.9-0.2,11.7-0.8c5.2-0.6,10.3-1.8,15.3-3.4l0,0c1.2-0.4,2.4-0.8,3.7-1.2c-1.3-2.8-4.1-9.1-4.3-9.4
		L151.4,157.2z"/>
	<path fill="#FFFFFF" d="M67.7,114.6c-4.7,10.6-7.9,23.7-7.9,35.5c0,2.9,0.1,5.9,0.4,8.8c3.2,33.4,24.8,61.6,54.5,74.2
		c1.2,0.5,2.5,1.1,3.8,1.5l-43.7-120C71,114.4,70.3,114.7,67.7,114.6z"/>
	<path fill="#FFFFFF" d="M231.9,112.1c-2-4.4-4.4-8.6-7.1-12.5c-0.8-1.1-1.6-2.2-2.4-3.4c-10.1-13.5-23.9-24.2-39.9-30.4
		c-10.1-4-21.1-6.1-32.5-6.1c-28.3,0-53.7,13.2-70.2,33.7c-3.1,3.8-5.8,7.8-8.2,12c6.7,0.1,14.9,0.1,15.9,0.1
		c8.5,0,21.6-1.1,21.6-1.1c4.4-0.3,4.9,6.1,0.5,6.7c0,0-4.4,0.5-9.3,0.8l29.5,87.9l17.8-53.3L135,112c-4.4-0.2-8.5-0.8-8.5-0.8
		c-4.4-0.2-3.8-7,0.5-6.7c0,0,13.4,1.1,21.4,1.1c8.5,0,21.6-1.1,21.6-1.1c4.4-0.3,5,6.1,0.5,6.7c0,0-4.4,0.5-9.3,0.8l29.3,87.2
		l8.1-27.1c4.1-10.5,6.1-19.2,6.1-26.2c0-10-3.6-17-6.7-22.4c-4.1-6.7-8-12.4-8-19c0-7.5,5.7-14.4,13.6-14.4c0.4,0,0.7,0,1.1,0
		c12.3-0.4,16.3,11.9,16.9,20.2c0,0,0,0.2,0,0.3c0.2,3.4,0.1,5.9,0.1,8.8c0,8.2-1.5,17.5-6.1,29l-18.5,53l-10.5,30.9
		c0.8-0.4,1.7-0.8,2.5-1.2c26.7-12.9,46.1-38.5,50.1-68.9c0.6-4,0.9-8.1,0.9-12.2C240.2,136.6,237.2,123.6,231.9,112.1z"/>
</g>
</svg>
`;

ClarityIcons.add({ wpLogo: logoLight, wpLogoDark: logoDark, check: ClrShapeCheck });
