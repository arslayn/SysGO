const express = require('express');
const si = require('systeminformation');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());

app.get('/api/system-info', async (req, res) => {
    try {
        const cpu = await si.cpu();
        const gpu = await si.graphics();
        const memory = await si.mem();
        const disk = await si.diskLayout();

        const systemInfo = {
            cpu: {
                manufacturer: cpu.manufacturer,
                brand: cpu.brand,
                speed: cpu.speed + ' GHz',
                cores: cpu.cores,
            },
            gpu: gpu.controllers.map(controller => ({
                model: controller.model,
                vram: controller.vram + ' MB',
            })),
            memory: {
                total: (memory.total / (1024 ** 3)).toFixed(2) + ' GB',
                free: (memory.free / (1024 ** 3)).toFixed(2) + ' GB',
            },
            storage: disk.map(d => ({
                name: d.name,
                size: (d.size / (1024 ** 3)).toFixed(2) + ' GB',
            })),
        };

        res.json(systemInfo);
    } catch (error) {
        console.error('Error fetching system information:', error);
        res.status(500).send('Error fetching system information');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});