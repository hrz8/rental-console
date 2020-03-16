const path = require('path');
const exec = require('child_process').exec;
const { remove } = require('../func');

test('Create new car', async () => {
    let result = await cli(['create_car', 'ZZ-9999', 'rainbow'], '.');
    expect(result.stdout).toBe('Car ZZ-9999 rainbow saved\n');
})

test('Reserved new car', async () => {
    let result = await cli(['reserve', 'ZZ-9999', 'Zayn', '2020-05-01'], '.');
    expect(result.stdout).toBe('Reserved ZZ-9999 to Zayn on 2020-05-01\n');
    await remove('ZZ-9999');
})

const cli = (args, cwd) => {
    return new Promise(resolve => { 
        exec(`node ${path.resolve('./rental')} ${args.join(' ')}`, { cwd }, (error, stdout, stderr) => { resolve({
                code: error && error.code ? error.code : 0,
                error,
                stdout,
                stderr
            })
        })
    })
}
