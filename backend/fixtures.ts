import mongoose from "mongoose";
import crypto from "crypto";
import connectToDB from "./connectToDB";
import User from "./models/User";
import Post from "./models/Post";
import Comment from "./models/Comment";

const dropColletction = async (db: mongoose.Connection, collectionsName: string) => {
    try {
        await db.dropCollection(collectionsName);
    } catch (e) {
        console.log(`Collection ${collectionsName} was missing, skipping drop...`)
    }
}

const run = async () => {
    await mongoose.connect(connectToDB.db);
    const db = mongoose.connection;

    const collections = ['users', 'posts', 'comments'];

    for (const collectionsName of collections) {
        await dropColletction(db, collectionsName);
    }

    const user = await User.create([
        {
            username: 'Petrov',
            password: 'Petrov_123#',
            token: crypto.randomUUID(),

        }, {
            username: 'Ivanov',
            password: 'Ivanov_123#',
            token: crypto.randomUUID(),
        },
    ]);

    const post = await Post.create([
        {
            user: user[0]._id,
            title: 'Величественные красоты гор Кыргызстана',
            description: 'Одно из самых лесистых и изумительных по красоте ущелье Арашан.' +
                ' Здесь много полезных трав, грибов, ягод, в июле десятки видов цветов покрывают поляны и склоны гор.' +
                ' Самое красивое время в ущелье — конец июля-август',
            image: 'fixtures/mountain.jpg'
        }, {
            user: user[0]._id,
            title: 'Отдых на Иссык-Куле зимой',
            description: 'Зимой самым привлекательным местом Иссык-Кульской области становится одна из наиболее ' +
                'отдалённых её точек – город Каракол и одноимённое ущелье' +
                ' в горах Терскей-Алатоо. Чтобы добраться сюда от столицы республики Бишкека, н' +
                'еобходимо преодолеть почти 400 километров на автомобиле',
            image: 'fixtures/winter.jpg',
        }, {
            user: user[1]._id,
            title: 'Польза катаний на велосипеде',
            description: 'Во время поездки на велосипеде ускоряется процесс циркуляции крови, что помогает замедлить старение кожи.' +
                ' Также во время езды создаются идеальные условия для выработки коллагена,' +
                ' замедляющего образование морщин. Регулярно катаясь на байке, вы будете тренировать мышцы ног, груди, спины, рук и живота одновременно.',
            image: 'fixtures/velo.jpg',
        }, {
            user: user[1]._id,
            title: 'История сноубординга',
            description: 'Изобретение сноуборда относят к началу 1960-х годов. Шерман Поппен из города Маскигон, штат Мичиган, придумал и изготовил ' +
                'для своей дочери в 1965 году современное подобие сноуборда, названное снёрфером (snurfer — слово, составленное из двух других — snow («снег») и surf — «сёрф»).' +
                ' Он склеил две лыжи в одно целое. По своей конструкции снёрфер был очень близок к скейтборду, только без колёс. Снёрфер не имел креплений, ' +
                'и чтобы удержаться на доске, катающийся должен был держаться за верёвку, привязанную к носу. ' +
                'Инструкция по пользованию также рекомендовала использовать для катания нескользящую обувь. Уже в 1966 году было начато производство ' +
                'снёрфера в качестве детской игрушки.',
            image: 'fixtures/surf.jpg',
        },
    ]);

    await Comment.create([
        {
            user: user[1]._id,
            post: post[0]._id,
            comment: 'В прошлом году ездил в долину Арсланбоб, там очень красиво!',
        }, {
            user: user[0]._id,
            post: post[0]._id,
            comment: 'А я был в каньоне Сказка, ну прям сказочная красота',
        }, {
            user: user[0]._id,
            post: post[1]._id,
            comment: 'Отдыхал как-то на горячих источникх, хорошо расслабился.',
        }, {
            user: user[1]._id,
            post: post[1]._id,
            comment: 'Прошлой зимой был на горнолыжном курорте в Караколе, лыжи для меня все!',
        }, {
            user: user[0]._id,
            post: post[2]._id,
            comment: 'Много говорят о пользе катания на велосипеде, но я сомневаюсь в этом утверждении',
        }, {
            user: user[1]._id,
            post: post[2]._id,
            comment: 'Попробуй! Глядишь и кожа на лице разгладится',
        }, {
            user: user[0]._id,
            post: post[3]._id,
            comment: 'О вот это для меня, обожаю сноуборд! Последний раз в альпах катался!',
        }, {
            user: user[1]._id,
            post: post[3]._id,
            comment: 'Круто в альпах! Мне там покататься - моя мечта!',
        },
    ]);

    await db.close();
};

void run();