const normalizeData = (data) => {

  return data.map((post) => {

    return {

      postId:
        post['﻿"Post ID"'] || post["Post ID"],

      username:
        post["Account username"],

      accountName:
        post["Account name"],

      description:
        post["Description"],

      publishTime:
        post["Publish time"],

      postType:
        post["Post type"],

      permalink:
        post["Permalink"],

      views:
        Number(post["Views"]) || 0,

      reach:
        Number(post["Reach"]) || 0,

      likes:
        Number(post["Likes"]) || 0,

      shares:
        Number(post["Shares"]) || 0,

      follows:
        Number(post["Follows"]) || 0,

      comments:
        Number(post["Comments"]) || 0,

      saves:
        Number(post["Saves"]) || 0,

      duration:
        Number(post["Duration (sec)"]) || 0,
    };
  });
};

module.exports = normalizeData;