import _ from 'lodash';
import './style.css';

let ele = document.createElement('div');
ele.innerHTML = _.join('hello webpack', '')
document.body.appendChild(ele)