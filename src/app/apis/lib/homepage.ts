import mongoose from 'mongoose';

const homepageSchema = new mongoose.Schema({
    banners: {type: Object},
    description: {type: String},
    flag: {
        type: String,
        enum: ['Banner', 'history', 'services']
    },
    updateAt: {type: Date, default: Date.now()}
});
const Home = mongoose.models.siteHomepage || mongoose.model("siteHomepage", homepageSchema);
export default Home;