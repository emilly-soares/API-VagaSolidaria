function isAdmin(req, res, next) {

  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Admin only.' });
  }

}

function isBusiness(req, res, next) {

  if (req.user && req.user.role === 'business') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Business only.' });
  }

}

function isCandidate(req, res, next) {

  if (req.user && req.user.role === 'candidate') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Candidate only.' });
  }
  
}

module.exports = { isAdmin, isBusiness, isCandidate };
