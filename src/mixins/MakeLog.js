const xlsx = require('xlsx');

export default {
	data() {
		return {
			data_log_1: [],
			data_log_2: [],
			url_pathname: '',
		};
	},
	methods:{
		loggingData(event) {
			//txt 로그
            var temp_log_1 = 
			'[' +
			this.getCurDt().ymd +
			']' +
			this.updown + 
			'/' +
			this.group.substr(-1) +
			'||' +
			this.nav_data_1.status.toString().toLowerCase() +
			'||' +
			this.nav_data_1.index +
			'||' +
			event.key +
			'\n' ;
            this.data_log_1.push(temp_log_1);

			//xlsx 로그
			var temp_log_2 = {
				date: this.getCurDt().date,
				time: this.getCurDt().time,
				updown: this.updown,
				img_set: this.group.substr(-1),
				nav_open: this.nav_data_1.status.toString().toLowerCase(),
				nav_index: this.nav_data_1.index + 1,
				key: event.key
			}
			this.data_log_2.push(temp_log_2);

            if(event.key === 'Backspace' || event.key === '=') {
				// this.data_log.push('=========== task 종료 ===========\n');
				this.makeTxt();
				this.makeXlsx();
            }
		},
		getCurDt() {
			let dt = new Date();
		
			let yy = dt.getFullYear();
			let mm = dt.getMonth() + 1; // january : 0
			let dd = dt.getDate();
			let hh = dt.getHours();
			let mi = dt.getMinutes();
			let ss = dt.getSeconds();
            let mss = dt.getMilliseconds();
		
			mm = (mm < 10 ? '0' : '') + mm;
			dd = (dd < 10 ? '0' : '') + dd;
			hh = (hh < 10 ? '0' : '') + hh;
			mi = (mi < 10 ? '0' : '') + mi;
			ss = (ss < 10 ? '0' : '') + ss;

			let ymd = yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mi + ':' + ss + ':' + mss;
			let date = yy + '-' + mm + '-' + dd;
			let time = hh + ':' + mi + ':' + ss + ':' + mss;
			return { ymd, date, time };
		},
		makeTxt(){
			var file_name = this.getCurDt().ymd+".txt";
			var data_log_final = this.data_log_1.join('');
			this.download(data_log_final,file_name,'text/html');
		},
		download(content, fileName, contentType) {
			var a = document.createElement("a");
			var file = new Blob([content], {type: contentType});
			a.href = URL.createObjectURL(file);
			a.download = fileName;
			a.click();
		},
		makeXlsx() {
			const workbook = xlsx.utils.book_new();
			const worksheet = xlsx.utils.json_to_sheet(this.data_log_2);
			xlsx.utils.book_append_sheet(workbook, worksheet, 'sheet1');
			xlsx.writeFile(workbook, `${this.getCurDt().ymd}.xlsx`);
		}
	},
	mounted() {
		this.url_pathname = window.location.pathname.substring(process.env.BASE_URL.length);
		window.addEventListener('keydown', this.loggingData);
	},
	unmounted() {
		window.removeEventListener('keydown', this.loggingData);
	},
}