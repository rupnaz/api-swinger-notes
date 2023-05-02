async function checkNote(req, res, next) {
    const { body } = req;
  
    if (!body?.title || !body?.text) {
      return res.status(400).json({ success: false, message: 'Title or text missing in body' });
    }
  
    if(body.title.length > 50){
        return res.status(400).json({ success: false, message: 'Title must shorter than 50 characters' })
    }
    if(body.text.length > 300){
        return res.status(400).json({ success: false, message: 'Text must shorter than 300 characters' })
    }
    
    next();
  }

  export {checkNote}