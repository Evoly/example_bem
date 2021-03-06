import svg4everybody from 'svg4everybody';
import objectFitImages from 'object-fit-images';
import './globalOptions';
import anchor from '../blocks/js-functions/anchor';
// import { freezebuttons } from '../blocks/js-functions/freeze';
// import scrollanimation from '../blocks/js-functions/scrollanimation';
import { inputmask } from '../blocks/form-elements/form-elements';
import popups from '../blocks/popups/popups';
// import scrollbar from '../blocks/scrollbar/scrollbar';
import slider from '../blocks/slider/slider';
// import tooltips from '../blocks/tooltip/tooltip';
// import tabs from '../blocks/tabs/tabs';
// import maps from '../blocks/map/map';
import header from '../components/header/header';
import video from '../components/video/video';
import profile from '../components/profile/profile';
// import '../blocks/rating/rating';
// import '../blocks/accordion/accordion';
// import '../blocks/dropdown/dropdown';
// import '../blocks/put-block-into-slot/put-block-into-slot';

const $ = window.$;

$(() => {
  svg4everybody();
  objectFitImages();
  anchor();
  // freezebuttons();
  // selects();
  // sliders();
  popups();
  // scrollbar();
  slider();
  // tooltips();
  // tabs();
  // datepicker();
  inputmask();
  // numberinput();
  // maps();
  header();
  video();
  profile();
  // scrollanimation();
});
