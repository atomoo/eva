import Eva from '../eva'
import models from './models'
import App from './components/App'

const app = new Eva()
app.loadModel(models)
app.render(document.getElementById('root'), App)
