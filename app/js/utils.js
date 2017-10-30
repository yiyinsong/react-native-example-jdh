import { Dimensions } from 'react-native';
import Config from '../config/config';

let floatCal = function(a, b, symbol) {
	let r1, r2, m;
	try {
		r1 = a.toString().split(".")[1].length
	} catch (e) {
		r1 = 0
	};
	try {
		r2 = b.toString().split(".")[1].length
	} catch (e) {
		r2 = 0
	};
	m = Math.pow(10, Math.max(r1, r2));
	a = a.toString().replace(".", "");
	b = b.toString().replace(".", "");
	if (r1 < r2) {
		a = parseInt(a) * Math.pow(10, (r2 - r1));
	} else if (r1 > r2) {
		b = parseInt(b) * Math.pow(10, (r1 - r2));
	}
	a = parseInt(a);
	b = parseInt(b);
	if (symbol === "+") return (a + b) / m;
	if (symbol === "-") return (a - b) / m;
	if (symbol === "*") return (a * b / Math.pow(10, Math.max(r1, r2)*2));
	if (symbol === "/") return (a / b);
}

export default {
	width: Dimensions.get('window').width,
	height: Dimensions.get('window').height,
	calc: {
		add: function(a,b){
	    return floatCal(a,b,'+');
	  },
	  sub: function(a,b){
	    return floatCal(a,b,'-');
	  },
	  mul: function(a,b){
	    return floatCal(a,b,'*');
	  },
	  div: function(a,b){
	    return floatCal(a,b,'/');
	  }
	},
	uploadImgFn(uri, success, error) {
		let formData = new FormData();
		let file = {uri, type: 'multipart/form-data', name: 'image.png'};
		formData.append("file", file);
		formData.append('rootPath', 'goods');
		formData.append('ratio', '200x0,400x0,750x0,1500x0');

		fetch(`${Config.UPLOADURL}file/uploadImg`, {
				method: 'POST',
				headers: {
					'Content-Type':'multipart/form-data'
				},
				body: formData,
		})
		.then((response) => response.json())
		.then((responseData)=> {
			success && success(responseData);
		})
		.catch((err)=> {
			error && errror(err);
		});
	}
}
