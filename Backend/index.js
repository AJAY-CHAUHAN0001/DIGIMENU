const express = require('express');
const { queryDb1, queryDb2 } = require('./db');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const { body, validationResult } = require('express-validator')
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env || 5000;
// const cors = require('cors');

// const corsOptions = {
//     origin: 'http://localhost:5173' , // Your frontend URL
//     origin: 'http://localhost:5174',
//     credentials: true, // Allow credentials
// };
// app.use(cors(corsOptions));

// For cors policy error
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // Allow all origins
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE"); // Allow specific methods
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization"); // Allow specific headers
    next();
});

// Middleware to parse JSON
app.use(express.json());

// Route to test database connection
app.get('/', async (req, res) => {
    try {
        res.status(200).json({ message: 'I am coming from backend.' })
    } catch (error) {
        console.log(error);

    }
})

// ****************************************************** UserController ***********************************************

app.get('/users', async (req, res) => {
    try {
        const result = await queryDb1('SELECT * FROM users');
        res.json({ status: 200, Users: result.rows });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ status: 500, message: 'Server Error!' });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const emailCheckresult = await queryDb1('select email from users where email=$1', [email]);
        const pwdcheckresult = await queryDb1('select password from users where password=$1', [password]);

        if (emailCheckresult.rows.length === 0 && pwdcheckresult.rows.length === 0) {
            return res.json({ status: 400, message: "invalid email and pwd!" })
        }
        else if (emailCheckresult.rows.length === 0) {
            return res.json({ status: 400, message: 'Invalid email' })
        }
        else if (pwdcheckresult.rows.length === 0) {
            return res.json({ status: 400, message: 'Invalid password' })
        }
        else {

            const result = await queryDb1('select name,email,password from users where email=$1 and password=$2',
                [email, password]);
            const cp = await queryDb1('select password  from users where email=$1', [email])

            if (result.rows.length > 0)
                return res.status(200).json({ status: 200, message: "Login Succesfull", username: `${result.rows[0].name}`, success: true });

            else if (cp.rows !== password) {
                return res.json({ status: 400, message: 'Invalid password' })
            }
        }
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({ status: 500, message: 'Server Error!' });
    }
});


app.post('/register', [
    body('name').notEmpty().withMessage('name is required'),
    body('email').notEmpty().withMessage('email is required'),
    body('password').notEmpty().withMessage('password is required'),
],
    async (req, res) => {
        try {
            // Handle Validation errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            else {
                const { name, email, password } = req.body;
                const emailCheckresult = await queryDb1('select email from users where email=$1;', [email])

                if (emailCheckresult.rows.length > 0) {

                    return res.json({ status: 400, message: "email already exists" })
                }

                if (req.body.password.length < 6) {
                    return res.json({ status: 400, message: "Password must be at least 6 characters!" })
                }
                else {
                    const result = await queryDb1('insert into users(name,email,password) values ($1,$2,$3) RETURNING *',
                        [name, email, password])

                    const newUser = result.rows[0];
                    delete newUser.password;
                    res.status(200).json({ status: 200, message: "Registered successfully.", success: true })
                }
            }
        }
        catch (error) {
            res.status(500).json({ status: 500, message: 'Server Error!' });
        }
    });


// ****************************************************** MenuController ***********************************************

//--------------------------------------- MenuCard -------------------------------------------------------

app.get('/menucard', async (req, res) => {
    try {
        const result = await queryDb2('select menu_name,menu_price,qty_type,group_name from menu,food_group,qtymast where menu.gid=food_group.gid and menu.qid=qtymast.qid order by menu_name asc');
        res.json({ status: 200, message: "Success", menucard: result.rows, success: true })

    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ message: 'Server Error!!' });

    }
});

//--------------------------------------- Veg Menu card --------------------------------------------------

app.get('/veg', async (req, res) => {
    try {
        const result = await queryDb2(`select menu_name,menu_price,group_name,qty_type from menu,food_group,qtymast where  menu.gid=food_group.gid and menu.qid=qtymast.qid and group_name='VEG'`);
        res.json({ status: 200, message: "Success", Veg_MenuCard: result.rows })

    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ status: 500, message: 'Server Error!' });

    }
});

//--------------------------------------- MENU MASTER TABLE ----------------------------------------------

app.get('/menu', async (req, res) => {
    try {
        const result = await queryDb2('select *from menu order by mid asc');
        res.json({ status: 200, message: "Success", menulist: result.rows })

    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ status: 500, message: 'Server Error!' });

    }
});

app.get('/menuByid', [
    body('id').notEmpty().withMessage('id is required')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        else {
            const { id } = req.body;
            const result = await queryDb2('select *from menu where mid=$1', [id]);
            if (result.rows.length > 0) {
                res.json({ status: 200, message: "success", data: result.rows })
            }
            else {
                res.json({ status: 400, message: 'No data found!' })
            }
        }
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ status: 500, message: 'Server Error!' });

    }
});

//----------------------------validation----------------------------------------------------
app.delete('/delmenu', [
    body('id').notEmpty().withMessage('id is required')
], async (req, res) => {
    try {
        // Handle Validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        else {
            const { id } = req.body;
            const rs = await queryDb2('select *from menu where mid=$1', [id]);
            if (rs.rows.length > 0) {
                await queryDb2('delete from menu where mid=$1', [id]);
                res.status(200).json({ status: "200", message: "Delete success", success: true })
            } else {
                res.json({ status: "400", message: "Delete failed" })
            }
        }
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ message: 'Server Error!!' });

    }
});

app.post('/addmenu', [

    body('menu_name').notEmpty().withMessage('menu_name is required'),
    body('menu_price').notEmpty().withMessage('menu_price is required'),
    body('gid').notEmpty().withMessage('gid is required'),
    body('qid').notEmpty().withMessage('qid is required')
], async (req, res) => {
    try {
        // Handle Validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        else {
            const { menu_name, menu_price, gid, qid } = req.body;

            const result = await queryDb2('insert into menu(menu_name,menu_price,gid,qid) values ($1,$2,$3,$4) RETURNING *'
                , [menu_name, menu_price, gid, qid]);
            res.json({ status: "200", message: "Add success", success: true })
        }
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ message: 'Server Error!!' });

    }
});

app.put('/updatemenu', [
    body('mid').notEmpty().withMessage('id is required'),
    body('menu_name').notEmpty().withMessage('menu_name is required'),
    body('menu_price').notEmpty().withMessage('menu_price is required'),
    body('gid').notEmpty().withMessage('gid is required'),
    body('qid').notEmpty().withMessage('qid is required')
], async (req, res) => {
    try {
        // Handle Validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } else {

            const { menu_name, menu_price, gid, qid, mid } = req.body;
            const rs = await queryDb2('select *from menu where mid=$1', [mid]);
            if (rs.rows.length > 0) {
                await queryDb2('update menu set menu_name=$1,menu_price=$2,gid=$3,qid=$4 where mid=$5'
                    , [menu_name, menu_price, gid, qid, mid]);

                res.json({ status: "200", message: "Update success", success: true });
            } else {
                res.json({ status: "400", message: "Update failed" });
            }

        }
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ message: 'Server Error!!' });

    }
});

//--------------------------------------------- food_group Master Table -----------------------------------

app.get('/foodgroup', async (req, res) => {
    try {
        const result = await queryDb2('select *from food_group order by gid asc');
        res.json({ status: 200, message: "Success", foodgroup: result.rows, success: true })
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ message: 'Server Error!!' });

    }
});

app.get('/foodgroupByid', [
    body('id').notEmpty().withMessage('id is required')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        else {
            const { id } = req.body;
            // console.log("id"+id);
            const result = await queryDb2('select *from food_group where gid=$1', [id]);
            if (result.rows.length > 0) {
                res.json({ status: 200, message: "success", data: result.rows })
            }
            else {
                res.json({ status: 400, message: 'No data found!' })
            }
        }
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ message: 'Server Error!!' });

    }
});

app.delete('/delfoodgroup', [
    body('id').notEmpty().withMessage('id is required')
], async (req, res) => {
    try {
        // Handle Validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        else {
            const { id } = req.body;
            const rs = await queryDb2('select *from food_group where gid=$1', [id]);
            if (rs.rows.length > 0) {
                await queryDb2('delete from food_group where gid=$1', [id]);
                res.json({ status: "200", message: "Delete food_group" })
            } else {
                res.json({ status: "400", message: "Delete failed" })
            }
        }
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ message: 'Server Error!' });

    }
});

app.post('/addfoodgroup', [

    body('group_name').notEmpty().withMessage('group_name is required')

], async (req, res) => {
    try {
        // Handle Validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        else {
            const { group_name } = req.body;

            const result = await queryDb2('insert into food_group(group_name) values ($1) RETURNING *'
                , [group_name]);
            res.json({ status: "200", message: "Add success", success: true })
        }
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ status: 500, message: 'Server Error!' });

    }
});

app.put('/updatefoodgroup', [
    body('group_name').notEmpty().withMessage('group_name is required'),
    body('gid').notEmpty().withMessage('gid is required')
], async (req, res) => {
    try {
        // Handle Validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } else {

            const { group_name, gid } = req.body;
            const rs = await queryDb2('select *from food_group where gid=$1', [gid]);
            if (rs.rows.length > 0) {
                await queryDb2('update food_group set group_name=$1 where gid=$2'
                    , [group_name, gid]);
                res.json({ status: "200", message: "Update food_group", success: true })
            } else {
                res.json({ status: "400", message: "Update failed" })
            }
        }
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ message: 'Server Error!' });

    }
});

//---------------------------------------- qtymast Master table -------------------------------------------

app.get('/qtymast', async (req, res) => {
    try {
        const result = await queryDb2('select *from qtymast');
        res.json({ status: 200, message: "Success", qtymast: result.rows })
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ message: 'Server Error!' });

    }
});

app.get('/qtymastByid', [
    body('id').notEmpty().withMessage('id is required')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        else {
            const { id } = req.body;
            const result = await queryDb2('select *from qtymast where qid=$1', [id]);
            if (result.rows.length > 0) {
                res.json({ status: 200, message: "success", data: result.rows })
            }
            else {
                res.json({ status: 400, message: 'No data found!' })
            }
        }
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ message: 'Server Error!' });

    }
});

app.delete('/delqtymast', [
    body('id').notEmpty().withMessage('id is required')
], async (req, res) => {
    try {
        // Handle Validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        else {
            const { id } = req.body;
            const rs = await queryDb2('select *from qtymast where qid=$1', [id]);
            if (rs.rows.length > 0) {
                await queryDb2('delete from qtymast where qid=$1', [id]);
                res.json({ status: "200", message: "Delete success", success: true })
            } else {
                res.json({ status: "400", message: "Delete failed" })
            }
        }
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ message: 'Server Error!' });

    }
});

app.post('/addqtymast', [

    body('qty_type').notEmpty().withMessage('qty_type is required')

], async (req, res) => {
    try {
        // Handle Validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        else {
            const { qty_type } = req.body;

            const result = await queryDb2('insert into qtymast(qty_type) values ($1) RETURNING *'
                , [qty_type]);
            res.json({ status: "200", message: "Add success", success: true })
        }
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ message: 'Server Error!' });

    }
});

app.put('/updateqtymast', [
    body('qty_type').notEmpty().withMessage('qty_type is required'),
    body('qid').notEmpty().withMessage('qid is required')
], async (req, res) => {
    try {
        // Handle Validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } else {

            const { qty_type, qid } = req.body;
            const rs = await queryDb2('select *from qtymast where qid=$1', [qid]);
            if (rs.rows.length > 0) {
                await queryDb2('update qtymast set qty_type=$1 where qid=$2'
                    , [qty_type, qid]);
                res.json({ status: "200", message: "Update qtymast", success: true })
            } else {
                res.json({ status: "400", message: "Update failed" })
            }
        }
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ message: 'Server Error!' });

    }
});

//---------------------------------------- Contact Us table -------------------------------------------

app.get('/contacts', async (req, res) => {
    try {
        const result = await queryDb2('select *from contacts order by id asc')
        res.status(200).json({ status: 200, message: 'success', userData: result.rows, success: true })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error!' })
    }
})

app.post('/addcontacts', [
    body('name').notEmpty().withMessage('name is required'),
    body('email').notEmpty().withMessage('email is required'),
    // body('subject').notEmpty().withMessage('subject is required'),
    body('usermessage').notEmpty().withMessage('usermessage is required'),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        else {
            const { name, email, subject, usermessage } = req.body;

            const result = await queryDb2('insert into contacts(name,email,subject,usermessage) values ($1,$2,$3,$4) RETURNING *'
                , [name, email, subject, usermessage]);

            res.status(200).json(
                {
                    status: 200,
                    message: 'message sent.',
                    success: true
                })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error!' });
    }
})

app.delete('/delcontacts', [
    body('id').notEmpty().withMessage('id is required')
], async (req, res) => {
    try {
        // Handle Validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        else {
            const { id } = req.body;
            const rs = await queryDb2('select *from contacts where id=$1', [id]);
            if (rs.rows.length > 0) {
                await queryDb2('delete from contacts where id=$1', [id]);
                res.json({ status: "200", message: "Delete success", success: true })
            } else {
                res.json({ status: "400", message: "Delete failed", success: false })
            }
        }
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ message: 'Server Error!' });

    }
});

app.get('/booktable', async (req, res) => {
    try {
        const result = await queryDb2('select *from bookAtable order by id asc')
        res.status(200).json({ status: 200, message: 'success', bookingData: result.rows, success: true })

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, message: 'Server Error!' })
    }
})

app.post('/booktables', [
    body('name').notEmpty().withMessage('name is required'),
    body('email').notEmpty().withMessage('email is required'),
    body('phone').notEmpty().withMessage('mob is required'),
    body('date').notEmpty().withMessage('bdate is required'),
    body('time').notEmpty().withMessage('btime is required'),
    body('people').notEmpty().withMessage('noofpeople is required'),
    body('message').notEmpty().withMessage('bmessage is required'),
], async (req,res) => {
    try {
        // Handle Validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        else {
            const { name, email, phone, date, time, people, message } = req.body;
            const result = await queryDb2('insert into bookAtable(name,email,mob,bdate,btime,noofpeople,bmessage) values ($1,$2,$3,$4,$5,$6,$7) RETURNING *'
                , [name, email, phone, date, time, people, message])

            res.status(200).json({
                status: 200,
                message: 'message sent.',
                success: true
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, message:'Server Error!' });
    }
})

app.delete('/delbooktables', [
    body('id').notEmpty().withMessage('id is required')
], async (req, res) => {
    try {
        // Handle Validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        else {
            const { id } = req.body;
            const rs = await queryDb2('select *from bookAtable where id=$1', [id]);
            if (rs.rows.length > 0) {
                await queryDb2('delete from bookAtable where id=$1', [id]);
                res.json({ status: "200", message: "Delete success", success: true })
            } else {
                res.json({ status: "400", message: "Delete failed", success: false })
            }
        }
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ message: 'Server Error!' });

    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
