function hashDate(listSize, date) {
    const startDate = new Date('2026-08-28T00:00:00+02:00'); //Day one
    
    const diffTime = date.getTime() - startDate.getTime();
    const daysSinceStart = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (daysSinceStart < 0) return 0; 
    
    let hash = (daysSinceStart * 2137) % listSize;
    
    return hash;
}