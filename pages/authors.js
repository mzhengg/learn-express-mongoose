let Author = require('../models/author');

const get_author_list = async () => {
  try {
    const authors = await Author.find({}).exec();
    const authorsWithVirtuals = authors.map(author => {
      return {
        name: author.name, // Accessing virtual property 'name'
        lifespan: author.lifespan // Accessing virtual property 'lifespan'
      };
    });
    return authorsWithVirtuals;
  } catch (err) {
    throw new Error('Failed to fetch authors: ' + err);
  }
};

exports.show_all_authors = function(res) {
  get_author_list()
    .then(data => res.send(data))
    .catch(err => res.send('No authors found: ' + err.message));
};
