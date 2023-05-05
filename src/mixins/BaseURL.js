export default {
      data() {
            return {
                  baseURL: ''
            };
      },
      mounted() {
            this.baseURL = process.env.BASE_URL;
      }
      
}