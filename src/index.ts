import { config as configureEnvironment } from 'dotenv';
import app from './app';
configureEnvironment();

const PORT = process.env.PORT || 3000;
app.listen(PORT).on('listening', () => {
    console.log(`Sheriff Scheduling API started on port ${PORT}...`);
}); 