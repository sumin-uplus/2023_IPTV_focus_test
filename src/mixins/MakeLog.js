export default {
	data() {
		return {
			data_log: [],
			url_pathname: ''
		};
	},
	methods:{
		loggingData(event) {
            var temp_log = '[' + this.getCurDt() + ']' + this.url_pathname + '||' + event.key + '\n';
            this.data_log.push(temp_log);

            if(event.key === 'Backspace' || event.key === '=') {
			this.data_log.push('=========== task 종료 ===========\n');
			this.makeLog();
			console.log(this.data_log);
            }
		},
		makeLog(){
			var file_name = this.getCurDt()+".txt";
			var data_log_final = this.data_log.join('');
			this.download(data_log_final,file_name,'text/html');
		},
		download(content, fileName, contentType) {
			var a = document.createElement("a");
			var file = new Blob([content], {type: contentType});
			a.href = URL.createObjectURL(file);
			a.download = fileName;
			a.click();
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
			return ymd;
		},
	},
	mounted() {
		this.url_pathname = window.location.pathname.substring(process.env.BASE_URL.length);
		window.addEventListener('keydown', this.loggingData);
	},
	unmounted() {
		window.removeEventListener('keydown', this.loggingData);
	},
}